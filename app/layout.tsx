import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Abang Kaunselor",
  description:
    "Kaunselor kerjaya AI paling jujur untuk pelajar SPM Malaysia. Masukkan result kau, Abang bagitahu jalan hidup kau.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="ms"
      className={`${plusJakartaSans.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-gray-950 text-gray-100">
        {children}
      </body>
    </html>
  );
}
