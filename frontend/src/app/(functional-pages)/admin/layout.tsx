import { SignoutButton } from "@/components/authentication/SignoutButton";

export default function RootLayout({
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
