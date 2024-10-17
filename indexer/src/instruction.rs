use std::cell::{Ref, RefCell};
use std::rc::{Rc, Weak};
use anyhow::Error;

use substreams_solana::pb::sf::solana::r#type::v1::ConfirmedTransaction;

use substreams_solana_utils::instruction::{get_structured_instructions, StructuredInstruction, StructuredInstructions};
use substreams_solana_utils::pubkey::PubkeyRef;
use substreams_solana_utils::log::Log;

use substreams_database_change::tables::{Row, Tables};

use substreams_solana_utils::transaction::TransactionContext;

use crate::parsers::{
    system_program::parse_system_program_instruction,
    spl_token::parse_spl_token_instruction,
    raydium_amm::parse_raydium_amm_instruction,
    pumpfun::parse_pumpfun_instruction,
    mpl_token_metadata::parse_mpl_token_metadata_instruction,
};

use raydium_amm_substream::raydium_amm::constants::RAYDIUM_AMM_PROGRAM_ID;
use mpl_token_metadata_substream::mpl_token_metadata::constants::MPL_TOKEN_METADATA_PROGRAM_ID;
use substreams_solana_utils::spl_token::constants::TOKEN_PROGRAM_ID;
use substreams_solana_utils::system_program::constants::SYSTEM_PROGRAM_ID;
use pumpfun_substream::pumpfun::PUMPFUN_PROGRAM_ID;

#[derive(Debug)]
pub struct IndexedInstruction<'a> {
    pub instruction: Rc<StructuredInstruction<'a>>,
    inner_instructions: RefCell<Vec<Rc<Self>>>,
    parent_instruction: RefCell<Option<Weak<Self>>>,
    pub index: i32,
}

#[allow(unused)]
impl<'a> IndexedInstruction<'a> {
    pub fn new(instruction: Rc<StructuredInstruction<'a>>, index: i32) -> Self {
        IndexedInstruction {
            instruction,
            inner_instructions: RefCell::new(Vec::new()),
            parent_instruction: RefCell::new(None),
            index,
        }
    }
    pub fn inner_instructions(&self) -> Ref<Vec<Rc<Self>>> { self.inner_instructions.borrow() }
    pub fn parent_instruction(&self) -> Option<Rc<Self>> { self.parent_instruction.borrow().as_ref().map(|x| x.upgrade().unwrap()) }

    pub fn program_id(&self) -> PubkeyRef<'a> { self.instruction.program_id() }
    pub fn program_id_index(&self) -> u32 { self.instruction.program_id_index() }
    pub fn accounts(&self) -> &Vec<PubkeyRef> { self.instruction.accounts() }
    pub fn data(&self) -> &Vec<u8> { self.instruction.data() }
    pub fn stack_height(&self) -> Option<u32> { self.instruction.stack_height() }
    pub fn logs(&self) -> Ref<Option<Vec<Log<'a>>>> { self.instruction.logs() }

    pub fn top_instruction(&self) -> Option<Rc<Self>> {
        if let Some(instruction) = self.parent_instruction() {
            let mut top_instruction = instruction;
            while let Some(parent_instruction) = top_instruction.parent_instruction() {
                top_instruction = parent_instruction;
            }
            Some(top_instruction)
        } else {
            None
        }
    }
}

pub fn get_indexed_instructions<'a>(transaction: &'a ConfirmedTransaction) -> Result<Vec<Rc<IndexedInstruction<'a>>>, Error> {
    let mut indexed_instructions: Vec<Rc<IndexedInstruction<'a>>> = Vec::new();

    let structured_instructions = get_structured_instructions(transaction).unwrap();
    let mut instruction_stack: Vec<Rc<IndexedInstruction<'a>>> = Vec::new();

    let mut index = 0;
    for instruction in structured_instructions.flattened() {
        while !instruction_stack.is_empty() && instruction_stack.last().unwrap().instruction.stack_height() >= instruction.stack_height() {
            let popped_instruction = instruction_stack.pop().unwrap();
            if instruction_stack.is_empty() {
               indexed_instructions.push(popped_instruction);
            }
        }

        let indexed_instruction = Rc::new(IndexedInstruction::new(instruction, index));
        if let Some(last_instruction) = instruction_stack.last() {
            *indexed_instruction.as_ref().parent_instruction.borrow_mut() = Some(Rc::downgrade(last_instruction));
            last_instruction.inner_instructions.borrow_mut().push(Rc::clone(&indexed_instruction));
        }
        instruction_stack.push(indexed_instruction);

        index += 1;
    }
    while !instruction_stack.is_empty() {
        let popped_instruction = instruction_stack.pop().unwrap();
        if instruction_stack.is_empty() {
           indexed_instructions.push(popped_instruction);
        }
    }

    Ok(indexed_instructions)
}

pub trait IndexedInstructions<'a> {
    fn flattened(&self) -> Vec<Rc<IndexedInstruction<'a>>>;
}

impl<'a> IndexedInstructions<'a> for Vec<Rc<IndexedInstruction<'a>>> {
    fn flattened(&self) -> Vec<Rc<IndexedInstruction<'a>>> {
        let mut instructions: Vec<Rc<IndexedInstruction>> = Vec::new();
        for instruction in self {
            instructions.push(Rc::clone(instruction));
            instructions.extend(instruction.inner_instructions.borrow().flattened().iter().map(Rc::clone));
        }
        instructions
    }
}

pub fn parse_instruction<'a>(
    instruction: &IndexedInstruction,
    context: &TransactionContext,
    tables: &'a mut Tables,
    slot: u64,
    transaction_index: u32,
) -> Result<Option<&'a mut Row>, Error> {
    let program_id = instruction.program_id();
    let row = if program_id == RAYDIUM_AMM_PROGRAM_ID {
        parse_raydium_amm_instruction(instruction, context, tables, slot, transaction_index)
    } else if program_id == TOKEN_PROGRAM_ID {
        parse_spl_token_instruction(instruction, context, tables, slot, transaction_index)
    } else if program_id == SYSTEM_PROGRAM_ID {
        parse_system_program_instruction(instruction, context, tables, slot, transaction_index)
    } else if program_id == PUMPFUN_PROGRAM_ID {
        parse_pumpfun_instruction(instruction, context, tables, slot, transaction_index)
    } else if program_id == MPL_TOKEN_METADATA_PROGRAM_ID {
        parse_mpl_token_metadata_instruction(instruction, context, tables, slot, transaction_index)
    } else {
        return Ok(None);
    }?;

    if let Some(row) = row {
        if let Some(parent_instruction) = instruction.parent_instruction() {
            let top_instruction = instruction.top_instruction().unwrap();
            row
                .set("parent_instruction_program_id", parent_instruction.program_id().to_string())
                .set("parent_instruction_index", parent_instruction.index)
                .set("top_instruction_program_id", top_instruction.program_id().to_string())
                .set("top_instruction_index", top_instruction.index);
        } else {
            row
                .set("parent_instruction_program_id", "")
                .set("parent_instruction_index", -1)
                .set("top_instruction_program_id", "")
                .set("top_instruction_index", -1);
        }
        Ok(Some(row))
    } else {
        Ok(None)
    }
}