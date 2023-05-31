import type { LoaderArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import {
  Link,
  isRouteErrorResponse,
  useLoaderData,
  useParams,
  useRouteError,
} from "@remix-run/react";
import { getInvoiceDetails } from "~/models/invoice.server";
import { requireUser } from "~/session.server";
import { currencyFormatter } from "~/utils";

export async function loader({ request, params }: LoaderArgs) {
  await requireUser(request);
  let invoiceId = params.invoiceId!;
  let invoiceDetails = await getInvoiceDetails(invoiceId);
  if (!invoiceDetails) {
    throw json("not found", 404);
  }
  return json({ invoiceDetails });
}

export default function InvoiceRoute() {
  let { invoiceDetails } = useLoaderData<typeof loader>();
  let { number: invoiceNumber, customer } = invoiceDetails.invoice;
  return (
    <div className="relative p-10">
      <div className="text-[length:14px] font-bold leading-6">
        Invoice #{invoiceNumber}
      </div>
      <div className="text-[length:32px] font-bold leading-[40px]">
        {currencyFormatter.format(invoiceDetails.totalAmount)}
      </div>
      <div
        className={
          "font-bold uppercase" +
          " " +
          (invoiceDetails.dueStatus === "paid"
            ? "text-green-brand"
            : invoiceDetails.dueStatus === "overdue"
            ? "text-red-brand"
            : "")
        }
      >
        {invoiceDetails.dueStatusDisplay}
      </div>
      <div className="mt-4 flex gap-4">
        {invoiceDetails.dueStatus !== "paid" &&
        invoiceDetails.dueStatus !== "overpaid" ? (
          <Link
            to="pay"
            className="text-blue-brand hover:text-blue-600 hover:underline"
          >
            Pay Invoice
          </Link>
        ) : null}
        <Link
          to={`../${customer.id}`}
          className="text-blue-brand hover:text-blue-600 hover:underline"
        >
          See All Invoices for {customer.name}
        </Link>
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
