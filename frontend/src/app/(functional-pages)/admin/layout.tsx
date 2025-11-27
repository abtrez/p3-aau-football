import { SignoutButton } from "@/components/authentication/SignoutButton";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <SignoutButton />
      {children}
    </>
  );
}
