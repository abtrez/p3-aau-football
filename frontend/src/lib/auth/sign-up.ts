import { authClient } from "@/lib/auth/auth-client";

const { data, error } = await authClient.signUp.email({
  email: "kresten@chad.dk", // user email address
  password: "ragebait", // user password -> min 8 characters by default
  name: "p3-aau-football", // user display name
  callbackURL: "/", // A URL to redirect to after the user verifies their email (optional)
});
