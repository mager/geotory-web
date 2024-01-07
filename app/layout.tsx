import { Analytics } from "@vercel/analytics/react";
import cx from "classnames";
import {
  robotoMono,
  nunitoSans,
  nunitoSansHeavy,
  sfPro,
  youngSerif,
} from "./fonts";
import { authOptions, getCurrentUser } from "@/lib/utils";
import Nav from "@/components/layout/nav";
import Footer from "@/components/layout/footer";
import { Suspense } from "react";
import { getServerSession } from "next-auth/next";

import "./globals.css";

export const metadata = {
  title: "Geotory",
  description:
    "Geotory is an open, social repository of shapes, layers, maps, and other geodata.",
  twitter: {
    card: "summary_large_image",
    title: "Geotory",
    description:
      "Geotory is an open, social repository of shapes, layers, maps, and other geodata.",
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
  const user = await getCurrentUser();
  return (
    <html lang="en">
      <body
        className={cx(
          robotoMono.className,
          nunitoSans.variable,
          nunitoSansHeavy.variable,
          sfPro.variable,
          youngSerif.variable,
        )}
      >
        <div className="flex h-screen flex-col justify-between">
          <Suspense fallback="...">
            <Nav session={session} user={user} />
          </Suspense>
          <main className="mb-auto flex w-full flex-col items-center justify-center py-20">
            {children}
          </main>
          <Footer />
        </div>
        <Analytics />
      </body>
    </html>
  );
}
