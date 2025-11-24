"use server";
import { auth } from "@/lib/auth/auth";
import { redirect } from "next/navigation";

export async function signIn(formData: FormData, redirectUrl: string) {
  const email = formData.get("email")?.toString();
  const password = formData.get("password")?.toString();

  if (!email || !password) {
    return { type: "CredentialsSignin", error: "Email or password not set" };
  }

  const response = await auth.api.signInEmail({
    body: {
      email: email,
      password: password,
      callbackURL: "/admin",
    },
    asResponse: true,
  });

  if (response.ok) {
    redirect(redirectUrl);
  } else {
    return { type: "CredentialsSignin", error: response.statusText };
  }
}
