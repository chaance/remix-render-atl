import type { V2_MetaFunction as MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => {
  return [{ title: "Sales Overview" }];
};

export default function SalesOverview() {
  return <div>Overview</div>;
}
