"use server";
import { auth } from "@/lib/auth/auth";

export const signIn = async (formData: FormData) => {
  await auth.api.signInEmail({
    body: {
      email: formData.get("email"),
      password: formData.get("password"),
    },
  });
};
