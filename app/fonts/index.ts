import localFont from "next/font/local";
import { Roboto_Mono, Inter, Nunito_Sans, Young_Serif } from "next/font/google";

export const sfPro = localFont({
  src: "./SF-Pro-Display-Medium.otf",
  variable: "--font-sf",
});

export const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const youngSerif = Young_Serif({
  variable: "--font-young-serif",
  subsets: ["latin"],
  weight: "400",
});

export const nunitoSans = Nunito_Sans({
  variable: "--font-nunito-sans",
  subsets: ["latin"],
  weight: "400",
});

export const nunitoSansHeavy = Nunito_Sans({
  variable: "--font-nunito-sans-heavy",
  subsets: ["latin"],
  weight: "1000",
});

export const robotoMono = Roboto_Mono({
  variable: "--font-roboto-mono",
  subsets: ["latin"],
  weight: "400",
});
