/* eslint-disable @typescript-eslint/no-unused-vars */
import type { LoaderArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import {
  Link,
  isRouteErrorResponse,
  useLoaderData,
  useMatches,
  useParams,
  useRouteError,
} from "@remix-run/react";
import { getInvoiceDetails } from "~/models/invoice.server";
import { currencyFormatter } from "~/utils";

export default function InvoiceRoute() {
  return (
    <div className="relative p-10">
      <div className="text-[length:14px] font-bold leading-6">
        {/* Invoice #{INVOICE_NUMBER} */}
      </div>
      <div className="text-[length:32px] font-bold leading-[40px]">
        {/* currencyFormatter.format(TOTAL_INVOICE_AMOUNT) */}
      </div>
      <div
        className={
          "font-bold uppercase" + " "
          /* + (DUE_STATUS === "paid"
            ? "text-green-brand"
            : DUE_STATUS === "overdue"
            ? "text-red-brand"
            : "") */
        }
      >
        {/* DUE_STATUS_DISPLAY */}
      </div>
      <div className="mt-4 flex gap-4">
        {/* DUE_STATUS !== "paid" &&
        DUE_STATUS !== "overpaid" ? (
          <Link
            to="pay"
            className="text-blue-brand hover:text-blue-600 hover:underline"
          >
            Pay Invoice
          </Link>
        ) : null */}
        {/* <Link
          to={CUSTOMER_ID}
          className="text-blue-brand hover:text-blue-600 hover:underline"
        >
          See All Invoices for {CUSTOMER_NAME}
        </Link> */}
      </div>
    </div>
  );
}

export function ErrorBoundary() {
  let error = useRouteError();
  let params = useParams();
  if (isRouteErrorResponse(error)) {
    switch (error.status) {
      case 404:
        return (
          <div className="p-12 text-red-500">
            No invoice found with the ID of "{params.invoiceId}"
          </div>
        );
      default:
        throw new Error(
          `Unexpected caught response with status: ${error.status}`,
        );
    }
  }
  throw error;
}
