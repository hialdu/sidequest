import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "SideQuest — Try new apps. Share what you think.",
  description: "Product testing adventures with sponsor-paid Solana devnet rewards for honest feedback.",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
