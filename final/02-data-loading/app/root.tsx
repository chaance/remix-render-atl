import { cssBundleHref } from "@remix-run/css-bundle";
import type { LinksFunction } from "@remix-run/node";
import {
  Form,
  Link,
  Links,
  LiveReload,
  Meta,
  NavLink,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import { FullFakebooksLogo, LogoutIcon, UpRightArrowIcon } from "~/components";
import tailwindStylesHref from "~/styles/tailwind.css";

export const links: LinksFunction = () => {
  return [
    cssBundleHref && { rel: "stylesheet", href: cssBundleHref },
    { rel: "stylesheet", href: tailwindStylesHref },
  ].filter(isTruthy);
};

export default function App() {
  return (
    <html lang="en" className="h-full">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body className="h-full">
        <AppLayout>
          <Outlet />
        </AppLayout>
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}

function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative flex h-full rounded-lg bg-white text-gray-600">
      <div className="border-r border-gray-100 bg-gray-50">
        <div className="p-4">
          <div className="flex flex-wrap items-center gap-1">
            <Link to=".">
              <FullFakebooksLogo size="sm" position="left" />
            </Link>
          </div>
          <div className="h-7" />
          <div className="flex flex-col font-bold text-gray-800">
            <NavItem to="dashboard">Dashboard</NavItem>
            <NavItem to="accounts">Accounts</NavItem>
            <NavItem to="sales">Sales</NavItem>
            <NavItem to="expenses">Expenses</NavItem>
            <NavItem to="reports">Reports</NavItem>
            <a
              href="https://github.com/chaance/remix-render-atl"
              className="my-1 flex gap-1 px-2 py-1 pr-16 text-[length:14px]"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub <UpRightArrowIcon aria-hidden />
            </a>

            <Form
              method="post"
              action="/logout"
              className="my-1 px-2 py-1 pr-16 text-[length:14px]"
            >
              <button type="submit" className="flex gap-1 font-bold">
                Logout <LogoutIcon aria-hidden />
              </button>
            </Form>
          </div>
        </div>
      </div>
      <div className="h-full flex-1">{children}</div>
    </div>
  );
}

function NavItem({ to, children }: { to: string; children: React.ReactNode }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `my-1 px-2 py-1 pr-16 text-[length:14px] ${
          isActive ? "rounded-md bg-gray-100" : ""
        }`
      }
    >
      {children}
    </NavLink>
  );
}

function isTruthy<T>(x: T): x is Exclude<T, undefined | null | "" | 0 | false> {
  return !!x;
}
