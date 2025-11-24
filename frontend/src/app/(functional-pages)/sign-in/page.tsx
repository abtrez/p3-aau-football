"use client";

import { useState } from "react";

import { signIn } from "@/lib/auth/sign-in";
import { authClient } from "@/lib/auth/auth-client";

export default function SignInForm() {
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: any) {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.target);

    await signIn(formData);
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input name="email" type="email" />
        <input name="password" type="password" />
        <button type="submit" disabled={loading}>
          Sign In
        </button>
      </form>
      <button
        onClick={async () => {
          authClient.signOut();
        }}
      >
        Sign Out
      </button>
    </div>
  );
}
