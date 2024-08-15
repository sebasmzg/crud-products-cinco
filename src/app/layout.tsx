import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  description: "Practice project with Next.js and Typescript for Riwi Be a Coder",
  keywords: "Next.js, Typescript, React, Project, Develop, Software, App, CRUD",
  robots: "index, follow",
  title: "Products"
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
