import {
  isRouteErrorResponse,
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useRouteError,
} from "@remix-run/react";

import resetsStylesheetUrl from "./styles/resets.css";
import rootStylesheetUrl from "./styles/root.css";

/** @type {import("@remix-run/node").LinksFunction} */
export const links = () => {
  return [
    { rel: "stylesheet", href: resetsStylesheetUrl },
    { rel: "stylesheet", href: rootStylesheetUrl },
  ];
};

export default function App() {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <div className="root">
          <Outlet />
          <ScrollRestoration />
          <Scripts />
          <LiveReload />
        </div>
      </body>
    </html>
  );
}

export function ErrorBoundary() {
  const error = useRouteError();
  if (isRouteErrorResponse(error)) {
    return (
      <div>
        <h1>{error.status}</h1>
        <p>{error.statusText}</p>
      </div>
    );
  }
  return (
    <div>
      <h1>Something went wrong!</h1>
      <p>{error?.message || "We're working on it!"}</p>
    </div>
  );
}
