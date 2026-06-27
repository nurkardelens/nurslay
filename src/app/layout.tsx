import type { Metadata } from "next";
import { Pinyon_Script, Cormorant_Garamond, Jost } from "next/font/google";
import "./globals.css";

const pinyonScript = Pinyon_Script({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin", "latin-ext"],
  variable: "--font-heading",
  display: "swap",
});

const jost = Jost({
  subsets: ["latin", "latin-ext"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Büşra & İlhan · 1 Ağustos 2026",
  description:
    "Büşra & İlhan evleniyor! Düğünümüze davetlisiniz. 1 Ağustos 2026, Ankara.",
  openGraph: {
    title: "Büşra & İlhan · 1 Ağustos 2026",
    description:
      "Büşra & İlhan evleniyor! Düğünümüze davetlisiniz. 1 Ağustos 2026, Ankara.",
    type: "website",
    locale: "tr_TR",
  },
  twitter: {
    card: "summary_large_image",
    title: "Büşra & İlhan · 1 Ağustos 2026",
    description:
      "Büşra & İlhan evleniyor! Düğünümüze davetlisiniz. 1 Ağustos 2026, Ankara.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="tr"
      className={`${pinyonScript.variable} ${cormorant.variable} ${jost.variable} h-full`}
    >
      <body className="min-h-full flex flex-col antialiased">{children}</body>
    </html>
  );
}
