import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"], // Use only Latin subset for now
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Teletebib",
  description: "A modern web application built with Next.js and Poppins font",
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/ico.png', type: 'image/png' },
    ],
    apple: '/ico.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${poppins.variable} antialiased`} suppressHydrationWarning>{children}</body>
    </html>
  );
}
