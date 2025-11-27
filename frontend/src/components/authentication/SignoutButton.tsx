"use client";

import { authClient } from "@/lib/auth/auth-client";
import Button from "@mui/material/Button";
import { redirect } from "next/navigation";

export function SignoutButton() {
  return (
    <Button
      variant="contained"
      onClick={async () => {
        await authClient.signOut();
        redirect("/sign-in");
      }}
      className="float-right"
    >
      Signout
    </Button>
  );
}
