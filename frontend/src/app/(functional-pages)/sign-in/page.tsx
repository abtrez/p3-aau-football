"use client";

import { SignInPage } from "@toolpad/core";

import { signIn } from "@/lib/auth/sign-in";

export default function Page() {
  const providers = [{ id: "credentials", name: "Email and Password" }];

  return (
    <SignInPage
      signIn={(_providers, formData) => signIn(formData, "/admin")}
      providers={providers}
      slotProps={{
        emailField: { autoFocus: false },
        form: { noValidate: true },
      }}
    />
  );
}
