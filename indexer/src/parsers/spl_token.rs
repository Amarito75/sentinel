use anyhow::Error;

use substreams_database_change::tables::{Row, Tables};
use substreams_solana_utils::transaction::TransactionContext;

use crate::instruction::IndexedInstruction;

use spl_token_substream;
use spl_token_substream::pb::spl_token::{spl_token_event, AuthorityType};

pub fn parse_spl_token_instruction<'a>(
    instruction: &IndexedInstruction,
    context: &TransactionContext,
    tables: &'a mut Tables,
    slot: u64,
    transaction_index: u32,
) -> Result<Option<&'a mut Row>, Error> {
    let row = match spl_token_substream::parse_instruction(&instruction.instruction, context)? {
        Some(spl_token_event::Event::InitializeMint(initialize_mint)) => {
            let row = tables.create_row("spl_token_initialize_mint_events", [("slot", slot.to_string()), ("transaction_index", transaction_index.to_string()), ("instruction_index", instruction.index.to_string())])
                .set("mint", &initialize_mint.mint)
                .set("decimals", initialize_mint.decimals)
                .set("mint_authority", &initialize_mint.mint_authority);
            match &initialize_mint.freeze_authority {
                Some(freeze_authority) => { row.set("freeze_authority", freeze_authority); }
                None => { row.set("freeze_authority", "null".to_string()); }
            }
            row
        },
        Some(spl_token_event::Event::InitializeAccount(initialize_account)) => {
            tables.create_row("spl_token_initialize_account_events", [("slot", slot.to_string()), ("transaction_index", transaction_index.to_string()), ("instruction_index", instruction.index.to_string())])
                .set("account_address", &initialize_account.account.as_ref().unwrap().address)
                .set("account_owner", &initialize_account.account.as_ref().unwrap().owner)
                .set("mint", &initialize_account.account.as_ref().unwrap().mint)
        },
        Some(spl_token_event::Event::InitializeMultisig(initialize_multisig)) => {
            tables.create_row("spl_token_initialize_multisig_events", [("slot", slot.to_string()), ("transaction_index", transaction_index.to_string()), ("instruction_index", instruction.index.to_string())])
                .set("multisig", &initialize_multisig.multisig)
                // .set_clickhouse_array("signers", initialize_multisig.signers.clone())
                .set("m", initialize_multisig.m)
        },
        Some(spl_token_event::Event::Transfer(transfer)) => {
            tables.create_row("spl_token_transfer_events", [("slot", slot.to_string()), ("transaction_index", transaction_index.to_string()), ("instruction_index", instruction.index.to_string())])
                .set("source_address", &transfer.source.as_ref().unwrap().address)
                .set("source_owner", &transfer.source.as_ref().unwrap().owner)
                .set("destination_address", &transfer.destination.as_ref().unwrap().address)
                .set("destination_owner", &transfer.destination.as_ref().unwrap().owner)
                .set("mint", &transfer.source.as_ref().unwrap().mint)
                .set("authority", &transfer.authority)
                .set("amount", transfer.amount)
        },
        Some(spl_token_event::Event::Approve(approve)) => {
            tables.create_row("spl_token_approve_events", [("slot", slot.to_string()), ("transaction_index", transaction_index.to_string()), ("instruction_index", instruction.index.to_string())])
                .set("source_address", &approve.source.as_ref().unwrap().address)
                .set("source_owner", &approve.source.as_ref().unwrap().owner)
                .set("mint", &approve.source.as_ref().unwrap().mint)
                .set("delegate", &approve.delegate)
                .set("amount", approve.amount)
        },
        Some(spl_token_event::Event::Revoke(revoke)) => {
            tables.create_row("spl_token_revoke_events", [("slot", slot.to_string()), ("transaction_index", transaction_index.to_string()), ("instruction_index", instruction.index.to_string())])
                .set("source_address", &revoke.source.as_ref().unwrap().address)
                .set("source_owner", &revoke.source.as_ref().unwrap().owner)
                .set("mint", &revoke.source.as_ref().unwrap().mint)
        },
        Some(spl_token_event::Event::SetAuthority(set_authority)) => {
            let row = tables.create_row("spl_token_set_authority_events", [("slot", slot.to_string()), ("transaction_index", transaction_index.to_string()), ("instruction_index", instruction.index.to_string())])
                .set("mint", &set_authority.mint)
                .set("authority_type", AuthorityType::from_i32(set_authority.authority_type).unwrap().as_str_name());
            match &set_authority.new_authority {
                Some(new_authority) => { row.set("new_authority", new_authority); }
                None => { row.set("new_authority", "null".to_string()); }
            }
            row
        },
        Some(spl_token_event::Event::MintTo(mint_to)) => {
            tables.create_row("spl_token_mint_to_events", [("slot", slot.to_string()), ("transaction_index", transaction_index.to_string()), ("instruction_index", instruction.index.to_string())])
                .set("destination_address", &mint_to.destination.as_ref().unwrap().address)
                .set("destination_owner", &mint_to.destination.as_ref().unwrap().owner)
                .set("mint", &mint_to.mint)
                .set("mint_authority", &mint_to.mint_authority)
                .set("amount", mint_to.amount)
        },
        Some(spl_token_event::Event::Burn(burn)) => {
            tables.create_row("spl_token_burn_events", [("slot", slot.to_string()), ("transaction_index", transaction_index.to_string()), ("instruction_index", instruction.index.to_string())])
                .set("source_address", &burn.source.as_ref().unwrap().address)
                .set("source_owner", &burn.source.as_ref().unwrap().owner)
                .set("mint", &burn.source.as_ref().unwrap().mint)
                .set("amount", burn.amount)
                .set("authority", &burn.authority)
        },
        Some(spl_token_event::Event::CloseAccount(close_account)) => {
            tables.create_row("spl_token_close_account_events", [("slot", slot.to_string()), ("transaction_index", transaction_index.to_string()), ("instruction_index", instruction.index.to_string())])
                .set("source_address", &close_account.source.as_ref().unwrap().address)
                .set("source_owner", &close_account.source.as_ref().unwrap().owner)
                .set("destination", &close_account.destination)
                .set("mint", &close_account.source.as_ref().unwrap().mint)
        },
        Some(spl_token_event::Event::FreezeAccount(freeze_account)) => {
            tables.create_row("spl_token_freeze_account_events", [("slot", slot.to_string()), ("transaction_index", transaction_index.to_string()), ("instruction_index", instruction.index.to_string())])
                .set("source_address", &freeze_account.source.as_ref().unwrap().address)
                .set("source_owner", &freeze_account.source.as_ref().unwrap().owner)
                .set("mint", &freeze_account.source.as_ref().unwrap().mint)
                .set("freeze_authority", &freeze_account.freeze_authority)
        },
        Some(spl_token_event::Event::ThawAccount(thaw_account)) => {
            tables.create_row("spl_token_thaw_account_events", [("slot", slot.to_string()), ("transaction_index", transaction_index.to_string()), ("instruction_index", instruction.index.to_string())])
                .set("source_address", &thaw_account.source.as_ref().unwrap().address)
                .set("source_owner", &thaw_account.source.as_ref().unwrap().owner)
                .set("mint", &thaw_account.source.as_ref().unwrap().mint)
                .set("freeze_authority", &thaw_account.freeze_authority)
        },
        Some(spl_token_event::Event::InitializeImmutableOwner(initialize_immutable_owner)) => {
            tables.create_row("spl_token_initialize_immutable_owner_events", [("slot", slot.to_string()), ("transaction_index", transaction_index.to_string()), ("instruction_index", instruction.index.to_string())])
                .set("account_address", &initialize_immutable_owner.account.as_ref().unwrap().address)
                .set("account_owner", &initialize_immutable_owner.account.as_ref().unwrap().owner)
                .set("mint", &initialize_immutable_owner.account.as_ref().unwrap().mint)
        },
        Some(spl_token_event::Event::SyncNative(sync_native)) => {
            tables.create_row("spl_token_sync_native_events", [("slot", slot.to_string()), ("transaction_index", transaction_index.to_string()), ("instruction_index", instruction.index.to_string())])
                .set("account_address", &sync_native.account.as_ref().unwrap().address)
                .set("account_owner", &sync_native.account.as_ref().unwrap().owner)
        }
        None => return Ok(None)
    };
    Ok(Some(row))
}