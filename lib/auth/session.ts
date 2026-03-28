import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/auth-options";

export async function getSession() {
  return getServerSession(authOptions);
}
