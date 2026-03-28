"use server";

import { redirect } from "next/navigation";
import { connectDB } from "@/lib/db";
import { hashPassword } from "@/lib/auth/password";
import { User } from "@/models/User";
import { registerSchema } from "@/lib/validations/auth";

export type RegisterState = {
  error: string;
  fieldErrors?: Record<string, string[]>;
} | null;

export async function registerUser(
  _prev: RegisterState,
  formData: FormData,
): Promise<RegisterState> {
  const phoneRaw = formData.get("phone");
  const phone =
    typeof phoneRaw === "string" && phoneRaw.trim().length > 0 ? phoneRaw.trim() : undefined;

  const parsed = registerSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
    phone,
  });

  if (!parsed.success) {
    const fieldErrors = parsed.error.flatten().fieldErrors;
    return {
      error: "Please fix the highlighted fields.",
      fieldErrors: fieldErrors as Record<string, string[]>,
    };
  }

  const { name, email, password, phone: phoneVal } = parsed.data;

  await connectDB();
  const existing = await User.findOne({ email });
  if (existing) {
    return { error: "An account with this email already exists." };
  }

  const passwordHash = await hashPassword(password);
  try {
    await User.create({
      name,
      email,
      passwordHash,
      ...(phoneVal ? { phone: phoneVal } : {}),
      role: "customer",
    });
  } catch {
    return { error: "Something went wrong. Please try again." };
  }

  redirect("/login?registered=1");
}
