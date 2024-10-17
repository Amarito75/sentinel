import React from "react";
import { DataTable } from "./components/data-table";
import { columns, Payment } from "./components/columns";

async function getData(): Promise<Payment[]> {
  // Fetch data from your API here.
  return [
    {
      id: "728ed52f",
      amount: 100,
      status: "pending",
      email: "m@example.com",
    },
    // ...
  ];
}

const Table = async () => {
  const data = await getData();
  return <DataTable columns={columns} data={data} />;
};

export default Table;
