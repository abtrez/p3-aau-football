import { authClient } from "@/lib/auth/auth-client";

export default async function Page() {
  await authClient.signUp.email({
    name: "kresten",
    email: "kresten@chad.dk",
    password: "ragebait",
    team: "6915ee5803b4c79157d96d84",
  });

  return <h1>Welcome kresten</h1>;
}
