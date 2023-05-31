import type { V2_MetaFunction as MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => {
  return [{ title: "Reports" }];
};

export default function ReportsRoute() {
  return <div>Look at all these reports! Business!</div>;
}
