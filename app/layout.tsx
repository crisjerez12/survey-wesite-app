import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Survey Website by Kiamba National Highschool",
  description: "Survey website by Jerez Group",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
