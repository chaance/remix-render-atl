import type { V2_MetaFunction as MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => {
  return [{ title: "Accounts" }];
};

export default function AccountsRoute() {
  return <div>Hope you have tons of accounts I guess.</div>;
}
