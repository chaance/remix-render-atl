import type { V2_MetaFunction as MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => {
  return [{ title: "Customers" }];
};

export default function InvoiceIndex() {
  return <div className="p-10">Select a customer to see details</div>;
}
