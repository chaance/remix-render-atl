import type { V2_MetaFunction as MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => {
  return [{ title: "Dashboard" }];
};

export default function DashboardRoute() {
  return <div>Look at all these graphs!</div>;
}
