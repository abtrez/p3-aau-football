import BottomBarNavigation from "@/components/navigation/BottomBarNavigation";
import Header from "@/components/header/Header";
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 p-4 pb-20">{children}</main>
      <BottomBarNavigation />
    </div>
  );
}
