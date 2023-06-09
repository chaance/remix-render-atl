/* eslint-disable @typescript-eslint/no-unused-vars */
import { type V2_MetaFunction as MetaFunction } from "@remix-run/node";
import {
  Link,
  isRouteErrorResponse,
  useParams,
  useRouteError,
} from "@remix-run/react";
import { getCustomerDetails } from "~/models/customer.server";
import { currencyFormatter } from "~/utils";

const customers = [
  {
    id: "1",
    name: "Santa Monica",
    email: "santa@monica.jk",
    invoiceDetails: [
      {
        id: "1",
        number: "INV-0001",
        dueStatus: "paid",
        dueStatusDisplay: "Paid",
        totalAmount: 10_000,
      },
    ],
  },
];

export const meta: MetaFunction = () => {
  let customer = customers[0];
  return [{ title: `Customer: ${customer.name}` }];
};

export default function CustomerRoute() {
  let customer = customers[0];
  return (
    <div className="relative p-10">
      <div className="text-[length:14px] font-bold leading-6">
        {customer.email}
      </div>
      <div className="text-[length:32px] font-bold leading-[40px]">
        {customer.name}
      </div>
      <div className="h-4" />
      <div className="text-m-h3 font-bold leading-8">Invoices</div>
      <div className="h-4" />
      <table className="w-full">
        <tbody>
          {customer.invoiceDetails.map((invoiceDetails) => (
            <tr
              key={invoiceDetails.id}
              className="h-[56px] border-t border-gray-100 text-[14px]"
            >
              <td>
                <Link
                  className="text-blue-600 underline"
                  to={`invoices/${invoiceDetails.id}`}
                >
                  {invoiceDetails.number}
                </Link>
              </td>
              <td
                className={
                  "text-center uppercase" +
                  " " +
                  (invoiceDetails.dueStatus === "paid"
                    ? "text-green-brand"
                    : invoiceDetails.dueStatus === "overdue"
                    ? "text-red-brand"
                    : "")
                }
              >
                {invoiceDetails.dueStatusDisplay}
              </td>
              <td className="text-right">
                {currencyFormatter.format(invoiceDetails.totalAmount)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
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
            No customer found with the ID of "{params.customerId}"
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
