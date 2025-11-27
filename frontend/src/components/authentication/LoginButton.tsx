"use client";

import Button from "@mui/material/Button";
import { redirect } from "next/navigation";

export default function LoginButton() {
  return (
    <Button
      variant="contained"
      onClick={() => {
        redirect("/sign-in");
      }}
      className="float-right"
    >
      Login
    </Button>
  );
}
