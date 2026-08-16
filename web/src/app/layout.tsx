import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "世界の両替事情 | 各国の決済・キャッシュレス・ATM両替完全ガイド",
    template: "%s | 世界の両替事情",
  },
  description:
    "海外旅行・出張前に知っておくべき各国の最新両替・決済事情データベース。台湾、韓国、タイ、欧米など主要15カ国のキャッシュレス比率、おすすめ両替所、手数料最安のATM、現金の必要性を徹底解説。",
  keywords: [
    "海外両替",
    "海外キャッシング",
    "キャッシュレス比率",
    "クレジットカード決済",
    "Wiseカード",
    "海外旅行",
    "世界の両替事情",
  ],
  authors: [{ name: "世界の両替事情 編集部" }],
  openGraph: {
    type: "website",
    locale: "ja_JP",
    siteName: "世界の両替事情 (World Currency Guide)",
    title: "世界の両替事情 | 各国の決済・キャッシュレス・ATM両替完全ガイド",
    description:
      "海外旅行・出張前に知っておくべき各国の最新両替・決済事情データベース。主要15カ国のキャッシュレス比率、おすすめ両替所、手数料最安のATMを徹底解説。",
  },
  twitter: {
    card: "summary_large_image",
    title: "世界の両替事情 | 各国の決済・キャッシュレス・ATM両替完全ガイド",
    description:
      "海外旅行・出張前に知っておくべき各国の最新両替・決済事情データベース。",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="ja"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
