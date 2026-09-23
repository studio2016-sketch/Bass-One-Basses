import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Bass One Basses | Built to Play With You",
  description: "Ergonomically enhanced, tonally dynamic electric basses by Dr. Duane Greene.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
