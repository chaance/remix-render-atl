import type { V2_MetaFunction as MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => {
  return [{ title: "Invoices" }];
};

export default function Invoices() {
  return <div>Invoices. Pay us!</div>;
}
