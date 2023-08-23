import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { UserProvider } from "@auth0/nextjs-auth0/client";
import Nav from "./components/nav/Nav";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Top News Today",
  description: "Top News Today",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <UserProvider>
        <body className={inter.className}>
          <Nav />
          {children}
        </body>
      </UserProvider>
    </html>
  );
}
