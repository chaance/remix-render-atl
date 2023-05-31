import type { V2_MetaFunction as MetaFunction } from "@remix-run/node";
import { NavLink } from "@remix-run/react";

export const meta: MetaFunction = () => {
  return [{ title: "Welcome to RenderATL!" }];
};

export default function Index() {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <div className="text-center">
        <h1>Welcome to RenderATL!</h1>
        <nav aria-label="main">
          <NavLink to="/sales/customers" className="font-bold underline">
            Go to the App
          </NavLink>
        </nav>
      </div>
    </div>
  );
}
