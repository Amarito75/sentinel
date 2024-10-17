use anyhow::{Error, Context};

use substreams_database_change::tables::Tables;
use substreams_solana::pb::sf::solana::r#type::v1::ConfirmedTransaction;
use substreams_solana_utils::transaction::get_context;

use crate::instruction::{get_indexed_instructions, parse_instruction, IndexedInstructions};

pub fn parse_transaction<'a>(
    transaction: &ConfirmedTransaction,
    transaction_index: u32,
    slot: u64,
    blockhash: &String,
    tables: &mut Tables,
) -> Result<bool, Error> {
    if let Some(_) = transaction.meta.as_ref().unwrap().err {
        return Ok(false);
    }

    let instructions = get_indexed_instructions(transaction)?;
    let context = get_context(transaction)?;

    let mut tables_changed = false;
    for instruction in instructions.flattened().iter() {
        match parse_instruction(instruction, &context, tables, slot, transaction_index).with_context(|| format!("Transaction {}", context.signature))? {
            Some(row) => {
                row
                    .set("partial_signature", &context.signature[0..4])
                    .set("partial_blockhash", &blockhash[0..4]);
                tables_changed = true;
            },
            None => (),
        }
    }

    Ok(tables_changed)
}