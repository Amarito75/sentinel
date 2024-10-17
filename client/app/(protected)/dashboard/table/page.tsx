import React from "react";
import { DataTable } from "./components/data-table";
import { columns } from "./components/columns";
import { Crypto } from "@/shared/types/crypto.type";

export async function getData(): Promise<Crypto[]> {
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
      image: "https://assets.coincap.io/assets/icons/btc@2x.png",
    },
    {
      id: "b91f1b6a",
      name: "Ethereum",
      symbol: "ETH",
      price: 200,
      change: 5,
      marketCap: 2000,
      volume: 2000,
      image: "https://assets.coincap.io/assets/icons/eth@2x.png",
    },
    {
      id: "c3d1e2f3",
      name: "Ripple",
      symbol: "XRP",
      price: 0.5,
      change: -2,
      marketCap: 500,
      volume: 300,
      image: "https://assets.coincap.io/assets/icons/xrp@2x.png",
    },
    {
      id: "d4e5f6g7",
      name: "Litecoin",
      symbol: "LTC",
      price: 50,
      change: 1,
      marketCap: 800,
      volume: 400,
      image: "https://assets.coincap.io/assets/icons/ltc@2x.png",
    },
    {
      id: "e7f8g9h0",
      name: "Cardano",
      symbol: "ADA",
      price: 1.2,
      change: 3,
      marketCap: 600,
      volume: 500,
      image: "https://assets.coincap.io/assets/icons/ada@2x.png",
    },
  ];
}

const Table = async () => {
  const data = await getData();
  return <DataTable columns={columns} data={data} />;
};

export default Table;
