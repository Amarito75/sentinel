use anyhow::{Error, anyhow};

use substreams_database_change::tables::{Row, Tables};
use substreams_solana_utils::transaction::TransactionContext;

use crate::instruction::IndexedInstruction;

use mpl_token_metadata_substream;
use mpl_token_metadata_substream::pb::mpl_token_metadata::mpl_token_metadata_event;

pub fn parse_mpl_token_metadata_instruction<'a>(
    instruction: &IndexedInstruction,
    context: &TransactionContext,
    tables: &'a mut Tables,
    slot: u64,
    transaction_index: u32,
) -> Result<Option<&'a mut Row>, Error> {
    let row = match mpl_token_metadata_substream::parse_instruction(&instruction.instruction, context).map_err(|x| anyhow!(x))? {
        Some(mpl_token_metadata_event::Event::CreateMetadataAccountV3(create_metadata_account_v3)) => {
            let data = create_metadata_account_v3.data.unwrap();
            let row = tables.create_row("mpl_token_metadata_create_metadata_account_v3_events", [("slot", slot.to_string()), ("transaction_index", transaction_index.to_string()), ("instruction_index", instruction.index.to_string())])
                .set("metadata", create_metadata_account_v3.metadata)
                .set("mint", create_metadata_account_v3.mint)
                .set("update_authority", create_metadata_account_v3.update_authority)
                .set("is_mutable", create_metadata_account_v3.is_mutable)
                .set("name", data.name)
                .set("symbol", data.symbol)
                .set("uri", data.uri)
                .set("seller_fee_basis_points", data.seller_fee_basis_points);
            row
        },
        Some(mpl_token_metadata_event::Event::ApproveCollectionAuthority(_)) => {
            tables.create_row("mpl_token_metadata_other_events", [("slot", slot.to_string()), ("transaction_index", transaction_index.to_string()), ("instruction_index", instruction.index.to_string())])
                .set("type", "approve_collection_authority")
        },
        Some(mpl_token_metadata_event::Event::ApproveUseAuthority(_)) => {
            tables.create_row("mpl_token_metadata_other_events", [("slot", slot.to_string()), ("transaction_index", transaction_index.to_string()), ("instruction_index", instruction.index.to_string())])
                .set("type", "approve_use_authority")
        },
        Some(mpl_token_metadata_event::Event::BubblegumSetCollectionSize(_)) => {
            tables.create_row("mpl_token_metadata_other_events", [("slot", slot.to_string()), ("transaction_index", transaction_index.to_string()), ("instruction_index", instruction.index.to_string())])
                .set("type", "bubblegum_set_collection_size")
        },
        Some(mpl_token_metadata_event::Event::Burn(_)) => {
            tables.create_row("mpl_token_metadata_other_events", [("slot", slot.to_string()), ("transaction_index", transaction_index.to_string()), ("instruction_index", instruction.index.to_string())])
                .set("type", "burn")
        },
        Some(mpl_token_metadata_event::Event::BurnEditionNft(_)) => {
            tables.create_row("mpl_token_metadata_other_events", [("slot", slot.to_string()), ("transaction_index", transaction_index.to_string()), ("instruction_index", instruction.index.to_string())])
                .set("type", "burn_edition_nft")
        },
        Some(mpl_token_metadata_event::Event::BurnNft(_)) => {
            tables.create_row("mpl_token_metadata_other_events", [("slot", slot.to_string()), ("transaction_index", transaction_index.to_string()), ("instruction_index", instruction.index.to_string())])
                .set("type", "burn_nft")
        },
        Some(mpl_token_metadata_event::Event::CloseEscrowAccount(_)) => {
            tables.create_row("mpl_token_metadata_other_events", [("slot", slot.to_string()), ("transaction_index", transaction_index.to_string()), ("instruction_index", instruction.index.to_string())])
                .set("type", "close_escrow_account")
        },
        Some(mpl_token_metadata_event::Event::ConvertMasterEditionV1ToV2(_)) => {
            tables.create_row("mpl_token_metadata_other_events", [("slot", slot.to_string()), ("transaction_index", transaction_index.to_string()), ("instruction_index", instruction.index.to_string())])
                .set("type", "convert_master_edition_v1_to_v2")
        },
        Some(mpl_token_metadata_event::Event::Create(_)) => {
            tables.create_row("mpl_token_metadata_other_events", [("slot", slot.to_string()), ("transaction_index", transaction_index.to_string()), ("instruction_index", instruction.index.to_string())])
                .set("type", "create")
        },
        Some(mpl_token_metadata_event::Event::CreateEscrowAccount(_)) => {
            tables.create_row("mpl_token_metadata_other_events", [("slot", slot.to_string()), ("transaction_index", transaction_index.to_string()), ("instruction_index", instruction.index.to_string())])
                .set("type", "create_escrow_account")
        },
        Some(mpl_token_metadata_event::Event::CreateMasterEdition(_)) => {
            tables.create_row("mpl_token_metadata_other_events", [("slot", slot.to_string()), ("transaction_index", transaction_index.to_string()), ("instruction_index", instruction.index.to_string())])
                .set("type", "create_master_edition")
        },
        Some(mpl_token_metadata_event::Event::CreateMasterEditionV3(_)) => {
            tables.create_row("mpl_token_metadata_other_events", [("slot", slot.to_string()), ("transaction_index", transaction_index.to_string()), ("instruction_index", instruction.index.to_string())])
                .set("type", "create_master_edition_v3")
        },
        Some(mpl_token_metadata_event::Event::CreateMetadataAccount(_)) => {
            tables.create_row("mpl_token_metadata_other_events", [("slot", slot.to_string()), ("transaction_index", transaction_index.to_string()), ("instruction_index", instruction.index.to_string())])
                .set("type", "create_metadata_account")
        },
        Some(mpl_token_metadata_event::Event::CreateMetadataAccountV2(_)) => {
            tables.create_row("mpl_token_metadata_other_events", [("slot", slot.to_string()), ("transaction_index", transaction_index.to_string()), ("instruction_index", instruction.index.to_string())])
                .set("type", "create_metadata_account_v2")
        },
        Some(mpl_token_metadata_event::Event::Delegate(_)) => {
            tables.create_row("mpl_token_metadata_other_events", [("slot", slot.to_string()), ("transaction_index", transaction_index.to_string()), ("instruction_index", instruction.index.to_string())])
                .set("type", "delegate")
        },
        Some(mpl_token_metadata_event::Event::DeprecatedCreateMasterEdition(_)) => {
            tables.create_row("mpl_token_metadata_other_events", [("slot", slot.to_string()), ("transaction_index", transaction_index.to_string()), ("instruction_index", instruction.index.to_string())])
                .set("type", "deprecated_create_master_edition")
        },
        Some(mpl_token_metadata_event::Event::DeprecatedCreateReservationList(_)) => {
            tables.create_row("mpl_token_metadata_other_events", [("slot", slot.to_string()), ("transaction_index", transaction_index.to_string()), ("instruction_index", instruction.index.to_string())])
                .set("type", "deprecated_create_reservation_list")
        },
        Some(mpl_token_metadata_event::Event::DeprecatedMintNewEditionFromMasterEditionViaPrintingToken(_)) => {
            tables.create_row("mpl_token_metadata_other_events", [("slot", slot.to_string()), ("transaction_index", transaction_index.to_string()), ("instruction_index", instruction.index.to_string())])
                .set("type", "deprecated_mint_new_edition_from_master_edition_via_printing_token")
        },
        Some(mpl_token_metadata_event::Event::DeprecatedMintPrintingTokens(_)) => {
            tables.create_row("mpl_token_metadata_other_events", [("slot", slot.to_string()), ("transaction_index", transaction_index.to_string()), ("instruction_index", instruction.index.to_string())])
                .set("type", "deprecated_mint_printing_tokens")
        },
        Some(mpl_token_metadata_event::Event::DeprecatedMintPrintingTokensViaToken(_)) => {
            tables.create_row("mpl_token_metadata_other_events", [("slot", slot.to_string()), ("transaction_index", transaction_index.to_string()), ("instruction_index", instruction.index.to_string())])
                .set("type", "deprecated_mint_printing_tokens_via_token")
        },
        Some(mpl_token_metadata_event::Event::DeprecatedSetReservationList(_)) => {
            tables.create_row("mpl_token_metadata_other_events", [("slot", slot.to_string()), ("transaction_index", transaction_index.to_string()), ("instruction_index", instruction.index.to_string())])
                .set("type", "deprecated_set_reservation_list")
        },
        Some(mpl_token_metadata_event::Event::FreezeDelegatedAccount(_)) => {
            tables.create_row("mpl_token_metadata_other_events", [("slot", slot.to_string()), ("transaction_index", transaction_index.to_string()), ("instruction_index", instruction.index.to_string())])
                .set("type", "freeze_delegated_account")
        },
        Some(mpl_token_metadata_event::Event::Lock(_)) => {
            tables.create_row("mpl_token_metadata_other_events", [("slot", slot.to_string()), ("transaction_index", transaction_index.to_string()), ("instruction_index", instruction.index.to_string())])
                .set("type", "lock")
        },
        Some(mpl_token_metadata_event::Event::Migrate(_)) => {
            tables.create_row("mpl_token_metadata_other_events", [("slot", slot.to_string()), ("transaction_index", transaction_index.to_string()), ("instruction_index", instruction.index.to_string())])
                .set("type", "migrate")
        },
        Some(mpl_token_metadata_event::Event::MintNewEditionFromMasterEditionViaToken(_)) => {
            tables.create_row("mpl_token_metadata_other_events", [("slot", slot.to_string()), ("transaction_index", transaction_index.to_string()), ("instruction_index", instruction.index.to_string())])
                .set("type", "mint_new_edition_from_master_edition_via_token")
        },
        Some(mpl_token_metadata_event::Event::MintNewEditionFromMasterEditionViaVaultProxy(_)) => {
            tables.create_row("mpl_token_metadata_other_events", [("slot", slot.to_string()), ("transaction_index", transaction_index.to_string()), ("instruction_index", instruction.index.to_string())])
                .set("type", "mint_new_edition_from_master_edition_via_vault_proxy")
        },
        Some(mpl_token_metadata_event::Event::PuffMetadata(_)) => {
            tables.create_row("mpl_token_metadata_other_events", [("slot", slot.to_string()), ("transaction_index", transaction_index.to_string()), ("instruction_index", instruction.index.to_string())])
                .set("type", "puff_metadata")
        },
        Some(mpl_token_metadata_event::Event::RemoveCreatorVerification(_)) => {
            tables.create_row("mpl_token_metadata_other_events", [("slot", slot.to_string()), ("transaction_index", transaction_index.to_string()), ("instruction_index", instruction.index.to_string())])
                .set("type", "remove_creator_verification")
        },
        Some(mpl_token_metadata_event::Event::Revoke(_)) => {
            tables.create_row("mpl_token_metadata_other_events", [("slot", slot.to_string()), ("transaction_index", transaction_index.to_string()), ("instruction_index", instruction.index.to_string())])
                .set("type", "revoke")
        },
        Some(mpl_token_metadata_event::Event::RevokeCollectionAuthority(_)) => {
            tables.create_row("mpl_token_metadata_other_events", [("slot", slot.to_string()), ("transaction_index", transaction_index.to_string()), ("instruction_index", instruction.index.to_string())])
                .set("type", "revoke_collection_authority")
        },
        Some(mpl_token_metadata_event::Event::RevokeUseAuthority(_)) => {
            tables.create_row("mpl_token_metadata_other_events", [("slot", slot.to_string()), ("transaction_index", transaction_index.to_string()), ("instruction_index", instruction.index.to_string())])
                .set("type", "revoke_use_authority")
        },
        Some(mpl_token_metadata_event::Event::SetAndVerifyCollection(_)) => {
            tables.create_row("mpl_token_metadata_other_events", [("slot", slot.to_string()), ("transaction_index", transaction_index.to_string()), ("instruction_index", instruction.index.to_string())])
                .set("type", "set_and_verify_collection")
        },
        Some(mpl_token_metadata_event::Event::SetAndVerifySizedCollectionItem(_)) => {
            tables.create_row("mpl_token_metadata_other_events", [("slot", slot.to_string()), ("transaction_index", transaction_index.to_string()), ("instruction_index", instruction.index.to_string())])
                .set("type", "set_and_verify_sized_collection_item")
        },
        Some(mpl_token_metadata_event::Event::SetTokenStandard(_)) => {
            tables.create_row("mpl_token_metadata_other_events", [("slot", slot.to_string()), ("transaction_index", transaction_index.to_string()), ("instruction_index", instruction.index.to_string())])
                .set("type", "set_token_standard")
        },
        Some(mpl_token_metadata_event::Event::SignMetadata(_)) => {
            tables.create_row("mpl_token_metadata_other_events", [("slot", slot.to_string()), ("transaction_index", transaction_index.to_string()), ("instruction_index", instruction.index.to_string())])
                .set("type", "sign_metadata")
        },
        Some(mpl_token_metadata_event::Event::ThawDelegatedAccount(_)) => {
            tables.create_row("mpl_token_metadata_other_events", [("slot", slot.to_string()), ("transaction_index", transaction_index.to_string()), ("instruction_index", instruction.index.to_string())])
                .set("type", "thaw_delegated_account")
        },
        Some(mpl_token_metadata_event::Event::Transfer(_)) => {
            tables.create_row("mpl_token_metadata_other_events", [("slot", slot.to_string()), ("transaction_index", transaction_index.to_string()), ("instruction_index", instruction.index.to_string())])
                .set("type", "transfer")
        },
        Some(mpl_token_metadata_event::Event::TransferOutOfEscrow(_)) => {
            tables.create_row("mpl_token_metadata_other_events", [("slot", slot.to_string()), ("transaction_index", transaction_index.to_string()), ("instruction_index", instruction.index.to_string())])
                .set("type", "transfer_out_of_escrow")
        },
        Some(mpl_token_metadata_event::Event::Unlock(_)) => {
            tables.create_row("mpl_token_metadata_other_events", [("slot", slot.to_string()), ("transaction_index", transaction_index.to_string()), ("instruction_index", instruction.index.to_string())])
                .set("type", "unlock")
        },
        Some(mpl_token_metadata_event::Event::Unverify(_)) => {
            tables.create_row("mpl_token_metadata_other_events", [("slot", slot.to_string()), ("transaction_index", transaction_index.to_string()), ("instruction_index", instruction.index.to_string())])
                .set("type", "unverify")
        },
        Some(mpl_token_metadata_event::Event::UnverifyCollection(_)) => {
            tables.create_row("mpl_token_metadata_other_events", [("slot", slot.to_string()), ("transaction_index", transaction_index.to_string()), ("instruction_index", instruction.index.to_string())])
                .set("type", "unverify_collection")
        },
        Some(mpl_token_metadata_event::Event::UnverifySizedCollectionItem(_)) => {
            tables.create_row("mpl_token_metadata_other_events", [("slot", slot.to_string()), ("transaction_index", transaction_index.to_string()), ("instruction_index", instruction.index.to_string())])
                .set("type", "unverify_sized_collection_item")
        },
        Some(mpl_token_metadata_event::Event::Update(_)) => {
            tables.create_row("mpl_token_metadata_other_events", [("slot", slot.to_string()), ("transaction_index", transaction_index.to_string()), ("instruction_index", instruction.index.to_string())])
                .set("type", "update")
        },
        Some(mpl_token_metadata_event::Event::UpdateMetadataAccount(_)) => {
            tables.create_row("mpl_token_metadata_other_events", [("slot", slot.to_string()), ("transaction_index", transaction_index.to_string()), ("instruction_index", instruction.index.to_string())])
                .set("type", "update_metadata_account")
        },
        Some(mpl_token_metadata_event::Event::UpdateMetadataAccountV2(_)) => {
            tables.create_row("mpl_token_metadata_other_events", [("slot", slot.to_string()), ("transaction_index", transaction_index.to_string()), ("instruction_index", instruction.index.to_string())])
                .set("type", "update_metadata_account_v2")
        },
        Some(mpl_token_metadata_event::Event::UpdatePrimarySaleHappenedViaToken(_)) => {
            tables.create_row("mpl_token_metadata_other_events", [("slot", slot.to_string()), ("transaction_index", transaction_index.to_string()), ("instruction_index", instruction.index.to_string())])
                .set("type", "update_primary_sale_happened_via_token")
        },
        Some(mpl_token_metadata_event::Event::Utilize(_)) => {
            tables.create_row("mpl_token_metadata_other_events", [("slot", slot.to_string()), ("transaction_index", transaction_index.to_string()), ("instruction_index", instruction.index.to_string())])
                .set("type", "utilize")
        },
        Some(mpl_token_metadata_event::Event::Print(_)) => {
            tables.create_row("mpl_token_metadata_other_events", [("slot", slot.to_string()), ("transaction_index", transaction_index.to_string()), ("instruction_index", instruction.index.to_string())])
                .set("type", "print")
        },
        Some(mpl_token_metadata_event::Event::Verify(_)) => {
            tables.create_row("mpl_token_metadata_other_events", [("slot", slot.to_string()), ("transaction_index", transaction_index.to_string()), ("instruction_index", instruction.index.to_string())])
                .set("type", "verify")
        },
        Some(mpl_token_metadata_event::Event::Mint(_)) => {
            tables.create_row("mpl_token_metadata_other_events", [("slot", slot.to_string()), ("transaction_index", transaction_index.to_string()), ("instruction_index", instruction.index.to_string())])
                .set("type", "mint")
        },
        Some(mpl_token_metadata_event::Event::SetCollectionSize(_)) => {
            tables.create_row("mpl_token_metadata_other_events", [("slot", slot.to_string()), ("transaction_index", transaction_index.to_string()), ("instruction_index", instruction.index.to_string())])
                .set("type", "set_collection_size")
        },
        Some(mpl_token_metadata_event::Event::Collect(_)) => {
            tables.create_row("mpl_token_metadata_other_events", [("slot", slot.to_string()), ("transaction_index", transaction_index.to_string()), ("instruction_index", instruction.index.to_string())])
                .set("type", "collect")
        },
        Some(mpl_token_metadata_event::Event::Use(_)) => {
            tables.create_row("mpl_token_metadata_other_events", [("slot", slot.to_string()), ("transaction_index", transaction_index.to_string()), ("instruction_index", instruction.index.to_string())])
                .set("type", "use")
        },
        Some(mpl_token_metadata_event::Event::VerifySizedCollectionItem(_)) => {
            tables.create_row("mpl_token_metadata_other_events", [("slot", slot.to_string()), ("transaction_index", transaction_index.to_string()), ("instruction_index", instruction.index.to_string())])
                .set("type", "verify_sized_collection_item")
        },
        Some(mpl_token_metadata_event::Event::VerifyCollection(_)) => {
            tables.create_row("mpl_token_metadata_other_events", [("slot", slot.to_string()), ("transaction_index", transaction_index.to_string()), ("instruction_index", instruction.index.to_string())])
                .set("type", "verify_collection")
        },
        None => return Ok(None),
    };
    Ok(Some(row))
}