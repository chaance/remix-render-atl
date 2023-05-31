import { cssBundleHref } from "@remix-run/css-bundle";
import type {
  LinksFunction,
  V2_MetaFunction as MetaFunction,
} from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import tailwindStylesHref from "~/styles/tailwind.css";

export const links: LinksFunction = () => {
  return [
    cssBundleHref && { rel: "stylesheet", href: cssBundleHref },
    { rel: "stylesheet", href: tailwindStylesHref },
  ].filter(isTruthy);
};

export const meta: MetaFunction = () => {
  return [{ title: "Fakebooks Remix" }];
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
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}

function isTruthy<T>(x: T): x is Exclude<T, undefined | null | "" | 0 | false> {
  return !!x;
}
