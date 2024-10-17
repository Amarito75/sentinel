use anyhow::{Error, anyhow};

use substreams_database_change::tables::{Row, Tables};
use substreams_solana_utils::transaction::TransactionContext;

use crate::instruction::IndexedInstruction;

use raydium_amm_substream;
use raydium_amm_substream::pb::raydium_amm::raydium_amm_event;

pub fn parse_raydium_amm_instruction<'a>(
    instruction: &IndexedInstruction,
    context: &TransactionContext,
    tables: &'a mut Tables,
    slot: u64,
    transaction_index: u32,
) -> Result<Option<&'a mut Row>, Error> {
    let row = match raydium_amm_substream::parse_instruction(&instruction.instruction, context).map_err(|x| anyhow!(x))? {
        Some(raydium_amm_event::Event::Swap(swap)) => {
            tables.create_row("raydium_amm_swap_events", [("slot", slot.to_string()), ("transaction_index", transaction_index.to_string()), ("instruction_index", instruction.index.to_string())])
                .set("amm", &swap.amm)
                .set("user", &swap.user)
                .set("amount_in", swap.amount_in)
                .set("amount_out", swap.amount_out)
                .set("mint_in", &swap.mint_in)
                .set("mint_out", &swap.mint_out)
                .set("direction", &swap.direction)
                .set("pool_pc_amount", swap.pool_pc_amount.unwrap_or(0))
                .set("pool_coin_amount", swap.pool_coin_amount.unwrap_or(0))
        }
        Some(raydium_amm_event::Event::Initialize(initialize)) => {
            tables.create_row("raydium_amm_initialize_events", [("slot", slot.to_string()), ("transaction_index", transaction_index.to_string()), ("instruction_index", instruction.index.to_string())])
                .set("amm", &initialize.amm)
                .set("user", &initialize.user)
                .set("pc_init_amount", initialize.pc_init_amount)
                .set("coin_init_amount", initialize.coin_init_amount)
                .set("lp_init_amount", initialize.lp_init_amount)
                .set("pc_mint", &initialize.pc_mint)
                .set("coin_mint", &initialize.coin_mint)
                .set("lp_mint", &initialize.lp_mint)
        },
        Some(raydium_amm_event::Event::Deposit(deposit)) => {
            tables.create_row("raydium_amm_deposit_events", [("slot", slot.to_string()), ("transaction_index", transaction_index.to_string()), ("instruction_index", instruction.index.to_string())])
                .set("amm", &deposit.amm)
                .set("user", &deposit.user)
                .set("pc_amount", deposit.pc_amount)
                .set("coin_amount", deposit.coin_amount)
                .set("pool_pc_amount", deposit.pool_pc_amount.unwrap_or(0))
                .set("pool_coin_amount", deposit.pool_coin_amount.unwrap_or(0))
                .set("lp_amount", deposit.lp_amount)
                .set("pc_mint", &deposit.pc_mint)
                .set("coin_mint", &deposit.coin_mint)
                .set("lp_mint", &deposit.lp_mint)
        },
        Some(raydium_amm_event::Event::Withdraw(withdraw)) => {
            tables.create_row("raydium_amm_withdraw_events", [("slot", slot.to_string()), ("transaction_index", transaction_index.to_string()), ("instruction_index", instruction.index.to_string())])
                .set("amm", &withdraw.amm)
                .set("user", &withdraw.user)
                .set("pc_amount", withdraw.pc_amount)
                .set("coin_amount", withdraw.coin_amount)
                .set("pool_pc_amount", withdraw.pool_pc_amount.unwrap_or(0))
                .set("pool_coin_amount", withdraw.pool_coin_amount.unwrap_or(0))
                .set("lp_amount", withdraw.lp_amount)
                .set("pc_mint", &withdraw.pc_mint)
                .set("coin_mint", &withdraw.coin_mint)
                .set("lp_mint", &withdraw.lp_mint)
        },
        Some(raydium_amm_event::Event::WithdrawPnl(withdraw_pnl)) => {
            tables.create_row("raydium_amm_withdraw_pnl_events", [("slot", slot.to_string()), ("transaction_index", transaction_index.to_string()), ("instruction_index", instruction.index.to_string())])
                .set("amm", withdraw_pnl.amm)
                .set("user", withdraw_pnl.user)
                .set("pc_amount", withdraw_pnl.pc_amount.unwrap_or(0))
                .set("coin_amount", withdraw_pnl.coin_amount.unwrap_or(0))
                .set("pc_mint", withdraw_pnl.pc_mint.unwrap_or("".to_string()))
                .set("coin_mint", withdraw_pnl.coin_mint.unwrap_or("".to_string()))
        }
        _ => return Ok(None),
    };
    Ok(Some(row))
}