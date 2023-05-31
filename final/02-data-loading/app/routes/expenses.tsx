import type { V2_MetaFunction as MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => {
  return [{ title: "Expenses" }];
};

export default function ExpensesRoute() {
  return <div>Hope you don't have a lot of these...</div>;
}
