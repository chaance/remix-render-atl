import type { V2_MetaFunction as MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => {
  return [{ title: "Deposits" }];
};

export default function Deposits() {
  return <div>Deposits. Cha-ching!</div>;
}
