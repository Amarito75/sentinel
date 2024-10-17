use anyhow::Error;

use substreams_database_change::tables::{Row, Tables};
use substreams_solana_utils::transaction::TransactionContext;

use crate::instruction::IndexedInstruction;

use pumpfun_substream;
use pumpfun_substream::pb::pumpfun::pumpfun_event;

pub fn parse_pumpfun_instruction<'a>(
    instruction: &IndexedInstruction,
    context: &TransactionContext,
    tables: &'a mut Tables,
    slot: u64,
    transaction_index: u32,
) -> Result<Option<&'a mut Row>, Error> {
    let row = match pumpfun_substream::parse_instruction(&instruction.instruction, context)? {
        Some(pumpfun_event::Event::Create(create)) => {
            tables.create_row("pumpfun_create_events", [("slot", slot.to_string()), ("transaction_index", transaction_index.to_string()), ("instruction_index", instruction.index.to_string())])
                .set("user", create.user)
                .set("name", create.name)
                .set("symbol", create.symbol)
                .set("uri", create.uri)
                .set("mint", create.mint)
                .set("bonding_curve", create.bonding_curve)
                .set("associated_bonding_curve", create.associated_bonding_curve)
                .set("metadata", create.metadata)
        },
        Some(pumpfun_event::Event::Initialize(initialize)) => {
            tables.create_row("pumpfun_initialize_events", [("slot", slot.to_string()), ("transaction_index", transaction_index.to_string()), ("instruction_index", instruction.index.to_string())])
                .set("user", initialize.user)
        },
        Some(pumpfun_event::Event::SetParams(set_params)) => {
            tables.create_row("pumpfun_set_params_events", [("slot", slot.to_string()), ("transaction_index", transaction_index.to_string()), ("instruction_index", instruction.index.to_string())])
                .set("user", set_params.user)
                .set("fee_recipient", set_params.fee_recipient)
                .set("initial_virtual_token_reserves", set_params.initial_virtual_token_reserves)
                .set("initial_virtual_sol_reserves", set_params.initial_virtual_sol_reserves)
                .set("initial_real_token_reserves", set_params.initial_real_token_reserves)
                .set("token_total_supply", set_params.token_total_supply)
                .set("fee_basis_points", set_params.fee_basis_points)
        },
        Some(pumpfun_event::Event::Swap(swap)) => {
            tables.create_row("pumpfun_swap_events", [("slot", slot.to_string()), ("transaction_index", transaction_index.to_string()), ("instruction_index", instruction.index.to_string())])
                .set("user", swap.user)
                .set("mint", swap.mint)
                .set("bonding_curve", swap.bonding_curve)
                .set("token_amount", swap.token_amount)
                .set("direction", swap.direction)
                .set("sol_amount", swap.sol_amount.unwrap_or(0))
                .set("virtual_sol_reserves", swap.virtual_sol_reserves.unwrap_or(0))
                .set("virtual_token_reserves", swap.virtual_token_reserves.unwrap_or(0))
                .set("real_sol_reserves", swap.real_sol_reserves.unwrap_or(0))
                .set("real_token_reserves", swap.real_token_reserves.unwrap_or(0))
        },
        Some(pumpfun_event::Event::Withdraw(withdraw)) => {
            tables.create_row("pumpfun_withdraw_events", [("slot", slot.to_string()), ("transaction_index", transaction_index.to_string()), ("instruction_index", instruction.index.to_string())])
                .set("mint", withdraw.mint)
        },
        None => return Ok(None)
    };
    Ok(Some(row))
}
