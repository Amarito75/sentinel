import React from "react";
import { DataTable } from "./components/data-table";
import { columns, Payment } from "./components/columns";
import { Separator } from "@/components/ui/separator";

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
const PaymentsPage = async () => {
  const data = await getData();

  return (
    <div className="w-full">
      <h1 className="text-2xl font-bold">Payments</h1>
      <p className="text-sm text-muted-foreground">
        Manage your subscriptions and payments.
      </p>
      <Separator className="my-4" />
      <DataTable columns={columns} data={data} />
    </div>
  );
};

export default PaymentsPage;
