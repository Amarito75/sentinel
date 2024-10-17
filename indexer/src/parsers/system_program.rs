use anyhow::Error;

use substreams_database_change::tables::{Row, Tables};
use substreams_solana_utils::transaction::TransactionContext;

use crate::instruction::IndexedInstruction;

use system_program_substream::pb::system_program::system_program_event;

pub fn parse_system_program_instruction<'a>(
    instruction: &IndexedInstruction,
    context: &TransactionContext,
    tables: &'a mut Tables,
    slot: u64,
    transaction_index: u32,
) -> Result<Option<&'a mut Row>, Error> {
    let row = match system_program_substream::parse_instruction(&instruction.instruction, context)? {
        Some(system_program_event::Event::CreateAccount(create_account)) => {
            tables.create_row("system_program_create_account_events", [("slot", slot.to_string()), ("transaction_index", transaction_index.to_string()), ("instruction_index", instruction.index.to_string())])
                .set("funding_account", create_account.funding_account)
                .set("new_account", create_account.new_account)
                .set("lamports", create_account.lamports)
                .set("space", create_account.space)
                .set("owner", create_account.owner)
        },
        Some(system_program_event::Event::Assign(assign)) => {
            tables.create_row("system_program_assign_events", [("slot", slot.to_string()), ("transaction_index", transaction_index.to_string()), ("instruction_index", instruction.index.to_string())])
                .set("assigned_account", assign.assigned_account)
                .set("owner", assign.owner)
        },
        Some(system_program_event::Event::Transfer(transfer)) => {
            tables.create_row("system_program_transfer_events", [("slot", slot.to_string()), ("transaction_index", transaction_index.to_string()), ("instruction_index", instruction.index.to_string())])
                .set("funding_account", transfer.funding_account)
                .set("recipient_account", transfer.recipient_account)
                .set("lamports", transfer.lamports)
        },
        Some(system_program_event::Event::CreateAccountWithSeed(create_account_with_seed)) => {
            tables.create_row("system_program_create_account_with_seed_events", [("slot", slot.to_string()), ("transaction_index", transaction_index.to_string()), ("instruction_index", instruction.index.to_string())])
                .set("funding_account", create_account_with_seed.funding_account)
                .set("created_account", create_account_with_seed.created_account)
                .set("base_account", create_account_with_seed.base_account)
                .set("seed", create_account_with_seed.seed)
                .set("lamports", create_account_with_seed.lamports)
                .set("space", create_account_with_seed.space)
                .set("owner", create_account_with_seed.owner)
        },
        Some(system_program_event::Event::AdvanceNonceAccount(advance_nonce_account)) => {
            tables.create_row("system_program_advance_nonce_account_events", [("slot", slot.to_string()), ("transaction_index", transaction_index.to_string()), ("instruction_index", instruction.index.to_string())])
                .set("nonce_account", advance_nonce_account.nonce_account)
                .set("nonce_authority", advance_nonce_account.nonce_authority)
        },
        Some(system_program_event::Event::WithdrawNonceAccount(withdraw_nonce_account)) => {
            tables.create_row("system_program_withdraw_nonce_account_events", [("slot", slot.to_string()), ("transaction_index", transaction_index.to_string()), ("instruction_index", instruction.index.to_string())])
                .set("nonce_account", withdraw_nonce_account.nonce_account)
                .set("nonce_authority", withdraw_nonce_account.nonce_authority)
                .set("recipient_account", withdraw_nonce_account.recipient_account)
                .set("lamports", withdraw_nonce_account.lamports)
        },
        Some(system_program_event::Event::InitializeNonceAccount(initialize_nonce_account)) => {
            tables.create_row("system_program_initialize_nonce_account_events", [("slot", slot.to_string()), ("transaction_index", transaction_index.to_string()), ("instruction_index", instruction.index.to_string())])
                .set("nonce_account", initialize_nonce_account.nonce_account)
                .set("nonce_authority", initialize_nonce_account.nonce_authority)
        },
        Some(system_program_event::Event::AuthorizeNonceAccount(authorize_nonce_account)) => {
            tables.create_row("system_program_authorize_nonce_account_events", [("slot", slot.to_string()), ("transaction_index", transaction_index.to_string()), ("instruction_index", instruction.index.to_string())])
                .set("nonce_account", authorize_nonce_account.nonce_account)
                .set("nonce_authority", authorize_nonce_account.nonce_authority)
                .set("new_nonce_authority", authorize_nonce_account.new_nonce_authority)
        },
        Some(system_program_event::Event::Allocate(allocate)) => {
            tables.create_row("system_program_allocate_events", [("slot", slot.to_string()), ("transaction_index", transaction_index.to_string()), ("instruction_index", instruction.index.to_string())])
                .set("account", allocate.account)
                .set("space", allocate.space)
        },
        Some(system_program_event::Event::AllocateWithSeed(allocate_with_seed)) => {
            tables.create_row("system_program_allocate_with_seed_events", [("slot", slot.to_string()), ("transaction_index", transaction_index.to_string()), ("instruction_index", instruction.index.to_string())])
                .set("allocated_account", allocate_with_seed.allocated_account)
                .set("base_account", allocate_with_seed.base_account)
                .set("seed", allocate_with_seed.seed)
                .set("space", allocate_with_seed.space)
                .set("owner", allocate_with_seed.owner)
        },
        Some(system_program_event::Event::AssignWithSeed(assign_with_seed)) => {
            tables.create_row("system_program_assign_with_seed_events", [("slot", slot.to_string()), ("transaction_index", transaction_index.to_string()), ("instruction_index", instruction.index.to_string())])
                .set("assigned_account", assign_with_seed.assigned_account)
                .set("base_account", assign_with_seed.base_account)
                .set("seed", assign_with_seed.seed)
                .set("owner", assign_with_seed.owner)
        },
        Some(system_program_event::Event::TransferWithSeed(transfer_with_seed)) => {
            tables.create_row("system_program_transfer_with_seed_events", [("slot", slot.to_string()), ("transaction_index", transaction_index.to_string()), ("instruction_index", instruction.index.to_string())])
                .set("funding_account", transfer_with_seed.funding_account)
                .set("base_account", transfer_with_seed.base_account)
                .set("recipient_account", transfer_with_seed.recipient_account)
                .set("lamports", transfer_with_seed.lamports)
                .set("from_seed", transfer_with_seed.from_seed)
                .set("from_owner", transfer_with_seed.from_owner)
        },
        Some(system_program_event::Event::UpgradeNonceAccount(upgrade_nonce_account)) => {
            tables.create_row("system_program_upgrade_nonce_account_events", [("slot", slot.to_string()), ("transaction_index", transaction_index.to_string()), ("instruction_index", instruction.index.to_string())])
                .set("nonce_account", upgrade_nonce_account.nonce_account)
        },
        None => return Ok(None),
    };
    Ok(Some(row))
}