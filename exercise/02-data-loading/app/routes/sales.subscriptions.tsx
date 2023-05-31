import type { V2_MetaFunction as MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => {
  return [{ title: "Subscriptions" }];
};

export default function Subscriptions() {
  return <div>Woo. Subs. Money.</div>;
}
