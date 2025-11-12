import BottomBarNavigation from "@/components/navigation/BottomBarNavigation";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      {children}
      <BottomBarNavigation />
    </>
  );
}
