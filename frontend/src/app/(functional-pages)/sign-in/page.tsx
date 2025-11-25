"use client";

import { SignInPage } from "@toolpad/core";

import { signIn } from "@/lib/auth/sign-in";
import { authClient } from "@/lib/auth/auth-client";
import { redirect } from "next/navigation";

export default function Page() {
  const providers = [{ id: "credentials", name: "Email and Password" }];

  const response = authClient.useSession();

  if (response.isPending) {
    return <p>Loading...</p>;
  }

  if (response.data && response.data.session) {
    redirect("/sign-in/pending");
  }

  return (
    <SignInPage
      signIn={(_providers, formData) => signIn(formData)}
      providers={providers}
      slotProps={{
        emailField: { autoFocus: false },
        form: { noValidate: true },
      }}
    />
  );
}
