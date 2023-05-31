/* eslint-disable @typescript-eslint/no-unused-vars */
import { redirect } from "@remix-run/node";
import { sessionStorage, getSession } from "~/session.server";

export async function loader() {
  return redirect("/");
}
