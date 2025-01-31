import { DM_Sans, Quicksand, Roboto } from "next/font/google";

export const quicksand = Quicksand({
  variable: "--font-quicksand",
  weight: ["300", "400", "500", "600", "700"],
  display: "block",
  subsets: ["latin"],
});

export const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  weight: ["400", "500", "600", "700", "900"],
  display: "block",
  subsets: ["latin"],
});

export const roboto = Roboto({
  variable: "--font-roboto",
  weight: ["400", "500", "700", "900"],
  display: "block",
  subsets: ["latin"],
});
