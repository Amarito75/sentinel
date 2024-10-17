import React from "react";
import Image from "next/image";
import TradingViewWidget from "@/components/charts/tradingview-widget";
import { DataTable } from "../components/data-table";
import { columns } from "../components/columns";
import { Exchange } from "@/shared/types/crypto.type";
import dynamic from "next/dynamic";

// Importation dynamique du composant PriceNumber
const PriceNumber = dynamic(
  () => import("@/components/effects/motion-number"),
  { ssr: false }
);

const CryptoResult = async ({ params }: { params: { id: string } }) => {
  const getImage = (id: string) => {
    return `https://assets.coincap.io/assets/icons/${id.toLowerCase()}@2x.png`;
  };

  const data: Exchange[] = [
    {
      id: "1",
      type: "Add",
      date: "2024-05-01T10:00:00Z",
      price: 50000,
      tokenFrom: 1000,
      tokenTo: 0.02,
      quantity: 0.02,
    },
    {
      id: "2",
      type: "Sell",
      date: "2024-05-02T14:30:00Z",
      price: 51000,
      tokenFrom: 0.01,
      tokenTo: 510,
      quantity: 0.01,
    },
    {
      id: "3",
      type: "Add",
      date: "2024-05-03T09:15:00Z",
      price: 49500,
      tokenFrom: 2000,
      tokenTo: 0.04040404,
      quantity: 0.04040404,
    },
    {
      id: "4",
      type: "Sell",
      date: "2024-05-04T16:45:00Z",
      price: 52000,
      tokenFrom: 0.015,
      tokenTo: 780,
      quantity: 0.015,
    },
    {
      id: "5",
      type: "Add",
      date: "2024-05-05T11:30:00Z",
      price: 53000,
      tokenFrom: 1500,
      tokenTo: 0.02830189,
      quantity: 0.02830189,
    },
  ];

  const id = params.id;

  return (
    <div className="space-y-4 h-full">
      <div className="flex items-center justify-between m-8">
        <Image src={getImage(id)} alt={id} width={64} height={64} />
        <div className="flex items-center space-x-4">
          <PriceNumber value={65353} />
        </div>
      </div>
      <div className="h-2/3">
        <TradingViewWidget symbol={id} />
      </div>
      <div className="h-1/3">
        <DataTable columns={columns} data={data} />
      </div>
    </div>
  );
};

export default CryptoResult;
