import React from "react";
import { DataTable } from "./components/data-table";
import { columns } from "./components/columns";
import { Crypto } from "@/shared/types/crypto.type";

async function getData(): Promise<Crypto[]> {
  // Fetch data from your API here.
  return [
    {
      id: "728ed52f",
      name: "Bitcoin",
      symbol: "BTC",
      price: 100,
      change: 10,
      marketCap: 1000,
      volume: 1000,
    },
    // ...
  ];
}

const Table = async () => {
  const data = await getData();
  return <DataTable columns={columns} data={data} />;
};

export default Table;
