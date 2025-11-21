import { auth } from "@/lib/auth/auth";

export default async function Page() {
  const res = await auth.api.signUpEmail({
    body: {
      email: "kresten@chad.dk", // user email address
      password: "ragebait", // user password -> min 8 characters by default
      name: "p3-aau-football", // user display name
      callbackURL: "/", // A URL to redirect to after the user verifies their email (optional)
      team: "6915ee5803b4c79157d96d84",
    },
  });

  return <p>{res.user.email}</p>;
}
