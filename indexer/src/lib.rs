mod transaction;
mod instruction;
mod parsers;

use anyhow::Error;

use substreams_database_change::pb::database::DatabaseChanges;
use substreams_database_change::tables::Tables;
use substreams_solana::pb::sf::solana::r#type::v1::Block;
use substreams_solana_utils::transaction::{get_signature, get_signers};

use transaction::parse_transaction;

#[substreams::handlers::map]
fn block_database_changes(block: Block) -> Result<DatabaseChanges, Error> {
    let mut tables = Tables::new();
    for (index, transaction) in block.transactions.iter().enumerate() {
        match parse_transaction(transaction, index as u32, block.slot, &block.blockhash, &mut tables)? {
            true => {
                let signers = get_signers(transaction);
                let row = tables.create_row("transactions", [("slot", block.slot.to_string()), ("transaction_index", index.to_string())])
                    .set("signature", get_signature(transaction))
                    .set("number_of_signers", signers.len().to_string());
                for i in 0..8 {
                    row.set(&format!("signer{i}"), signers.get(i).unwrap_or(&"".into()));
                }
            },
            false => (),
        }
    }
    tables.create_row("blocks", block.slot.to_string())
        .set("parent_slot", block.parent_slot)
        .set("block_height", block.block_height.as_ref().unwrap().block_height)
        .set("blockhash", block.blockhash)
        .set("previous_blockhash", block.previous_blockhash)
        .set("block_time", block.block_time.as_ref().unwrap().timestamp);
   Ok(tables.to_database_changes())
}