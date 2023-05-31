/* eslint-disable @typescript-eslint/no-unused-vars */
import { NavLink, Outlet } from "@remix-run/react";
import { getCustomerListItems } from "~/models/customer.server";

const customers = [
  { id: "1", name: "Santa Monica", email: "santa@monica.jk" },
  { id: "2", name: "Stankonia", email: "stan@konia.jk" },
  { id: "3", name: "Ocean Avenue", email: "ocean@avenue.jk" },
];

export default function Customers() {
  return (
    <div className="flex overflow-hidden rounded-lg border border-gray-100">
      <div className="w-1/2 border-r border-gray-100">
        <div className="max-h-96 overflow-y-scroll">
          {customers.map((customer) => (
            <NavLink
              key={customer.id}
              to={customer.id}
              className={({ isActive }) =>
                "block border-b border-gray-50 px-4 py-3 hover:bg-gray-50" +
                " " +
                (isActive ? "bg-gray-50" : "")
              }
            >
              <div className="flex justify-between text-[length:14px] font-bold leading-6">
                <div>{customer.name}</div>
              </div>
              <div className="flex justify-between text-[length:12px] font-medium leading-4 text-gray-400">
                <div>{customer.email}</div>
              </div>
            </NavLink>
          ))}
        </div>
      </div>
      <div className="flex w-1/2 flex-col justify-between">
        <Outlet />
      </div>
    </div>
  );
}
