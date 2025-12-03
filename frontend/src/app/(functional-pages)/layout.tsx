import BottomBarNavigation from "@/components/navigation/BottomBarNavigation";
import Header from "@/components/header/Header";
import { headers } from "next/headers";
import { auth } from "@/lib/auth/auth";
export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 p-4 pb-20">{children}</main>
      <BottomBarNavigation session={session} />
    </div>
  );
}
