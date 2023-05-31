/* eslint-disable @typescript-eslint/no-unused-vars */
import type { LoaderArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import clsx from "clsx";
import { NavLink, Outlet, useLoaderData, useLocation } from "@remix-run/react";
import { SpinnerIcon } from "~/components";
import { getFirstCustomer } from "~/models/customer.server";
import { getFirstInvoice } from "~/models/invoice.server";
import { requireUser } from "~/session.server";
import { useDelayedLoadingState } from "~/utils";

export async function loader({ request }: LoaderArgs) {
  await requireUser(request);
  const [firstInvoice, firstCustomer] = await Promise.all([
    getFirstInvoice(),
    getFirstCustomer(),
  ]);
  return json({
    firstInvoiceId: firstInvoice?.id,
    firstCustomerId: firstCustomer?.id,
  });
}

export default function SalesRoute() {
  let data = useLoaderData<typeof loader>();

  return (
    <div className="relative h-full p-10">
      <h1 className="font-display text-d-h3 text-black">Sales</h1>
      <div className="h-6" />
      <div className="flex gap-4 border-b border-gray-100 pb-4 text-[length:14px] font-medium text-gray-400">
        <NavItem to=".">Overview</NavItem>
        <NavItem to="subscriptions">Subscriptions</NavItem>
        <NavItem to="invoices">Invoices</NavItem>
        <NavItem
          to={
            data.firstCustomerId
              ? `customers/${data.firstCustomerId}`
              : "customers"
          }
        >
          Customers
        </NavItem>
        <NavLink to="deposits">Deposits</NavLink>
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

function Spinner({ visible }: { visible: boolean }) {
  return (
    <div
      className={clsx(
        "pointer-events-none absolute left-1/2 top-8 -translate-x-1/2 transition-opacity",
        {
          "opacity-0": !visible,
          "opacity-100": visible,
        },
      )}
    >
      <SpinnerIcon className={clsx("animate-spin")} height={160} width={160} />
    </div>
  );
}
