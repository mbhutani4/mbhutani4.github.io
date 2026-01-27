import type { Metadata } from "next";
import { AnalyticsClient } from "./analytics-client";
import Header from "ui/Header";
import Footer from "ui/Footer";
import "styles/globals.css";
import "styles/theme.css";

export const metadata: Metadata = {
  title: "Mahima Bhutani",
  description: "Portfolio of a UX/UI Designer.",
  openGraph: {
    title: "Mahima Bhutani",
    description: "Portfolio of a UX/UI Designer.",
    url: "https://bhutani.design",
    images: [
      {
        url: "https://bhutani.design/images/profile.jpeg",
        alt: "Mahima Bhutani",
      },
    ],
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <AnalyticsClient />
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
