import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://bass-one-basses.vercel.app"),
  title: "Bass One Basses | Built to Play With You",
  description: "Ergonomically enhanced, tonally dynamic electric basses handcrafted by Dr. Duane Greene in Austin, Texas.",
  keywords: ["Bass One Basses", "custom bass guitar", "ergonomic bass", "six string bass", "custom electric bass", "Dr. Duane Greene"],
  openGraph: {
    title: "Bass One Basses | Built to Play With You",
    description: "Instruments of uncommon balance, sensitivity, and beauty—created so the bass never stands between the musician and the music.",
    url: "/",
    siteName: "Bass One Basses",
    type: "website",
    images: [{ url: "https://static.wixstatic.com/media/3e9782_ffe190e9d6444da08b0bea83e02bbdd1~mv2.jpg", width: 1312, height: 805, alt: "Bass One custom bass" }],
  },
  twitter: { card: "summary_large_image", title: "Bass One Basses | Built to Play With You", description: "Ergonomically enhanced, tonally dynamic electric basses." },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
