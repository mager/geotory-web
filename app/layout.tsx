import Head from "next/head";
import { Analytics } from "@vercel/analytics/react";
import cx from "classnames";
import { sfPro, youngSerif, nunitoSans, nunitoSansHeavy } from "./fonts";
import { authOptions } from "@/lib/utils";
import Nav from "@/components/layout/nav";
import Footer from "@/components/layout/footer";
import { Suspense } from "react";
import { getServerSession } from "next-auth/next";

import "./globals.css";

export const metadata = {
  title: "Geotory",
  description:
    "Geotory is an open, social repository of shapes, layers, maps, and other geo data.",
  twitter: {
    card: "summary_large_image",
    title: "Geotory",
    description:
      "Geotory is an open, social repository of shapes, layers, maps, and other geo data.",
    creator: "@mager",
  },
  metadataBase: new URL("https://geotory.com"),
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  return (
    <html lang="en">
      <Head>
        <link rel="shortcut icon" href="public/favicon.ico" />
      </Head>
      <body
        className={cx(
          sfPro.variable,
          youngSerif.variable,
          nunitoSans.variable,
          nunitoSansHeavy.variable,
        )}
      >
        <div className="flex h-screen flex-col justify-between">
          <Suspense fallback="...">
            <Nav session={session} />
          </Suspense>
          <main className="mb-auto flex w-full flex-col items-center justify-center py-24">
            {children}
          </main>
          <Footer />
        </div>
        <Analytics />
      </body>
    </html>
  );
}
