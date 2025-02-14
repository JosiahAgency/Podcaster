import type { Metadata } from "next";
import "./globals.css";
import { Rubik } from 'next/font/google'

const rubik = Rubik({
  variable: "--font-rubik",
  subsets: ["latin"],
  weight: ['300', '400', '500', '600', '700', '800', '900'],
})


export const metadata: Metadata = {
  title: "JosiahPodcaster",
  description: "Generate Your Podcast Using AI",
  icons: {
    icon: '/icons/logo.svg'
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${rubik.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
