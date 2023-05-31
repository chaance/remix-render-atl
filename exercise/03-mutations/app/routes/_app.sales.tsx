import type { LoaderArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { NavLink, Outlet, useLocation } from "@remix-run/react";
import { requireUser } from "~/session.server";

export async function loader({ request }: LoaderArgs) {
  //   await requireUser(request);
  return json(null);
}

export default function SalesRoute() {
  return (
    <div className="relative h-full p-10">
      <h1 className="font-display text-d-h3 text-black">Sales</h1>
      <div className="h-6" />
      <div className="flex gap-4 border-b border-gray-100 pb-4 text-[length:14px] font-medium text-gray-400">
        <NavItem to=".">Overview</NavItem>
        <NavItem to="subscriptions">Subscriptions</NavItem>
        <NavItem to="invoices">Invoices</NavItem>
        <NavItem to="customers">Customers</NavItem>
        <NavItem to="deposits">Deposits</NavItem>
      </div>
      <div className="h-4" />
      <div className="relative">
        <Outlet />
      </div>
    </div>
  );
}

function NavItem({ to, children }: { to: string; children: React.ReactNode }) {
  let location = useLocation();
  const subpages = [
    "subscriptions",
    "invoices",
    "customers",
    "deposits",
  ] as const;
  let activeNavLink =
    location.pathname === "/sales"
      ? "overview"
      : subpages.find((subpage) =>
          location.pathname.startsWith(`/sales/${subpage}`),
        );
  let isActive = activeNavLink?.startsWith(to === "." ? "overview" : to);
  return (
    <NavLink to={to} className={isActive ? "font-bold text-black" : undefined}>
      {children}
    </NavLink>
  );
}
