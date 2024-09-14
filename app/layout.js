import { Outfit } from "next/font/google";
import "./globals.css";

const outfit = Outfit({ subsets: ['latin'],weight:["400","500","600","700"]})

// const geistSans = localFont({
//   src: "./fonts/GeistVF.woff",
//   variable: "--font-geist-sans",
//   weight: "100 900",
// });
// const geistMono = localFont({
//   src: "./fonts/GeistMonoVF.woff",
//   variable: "--font-geist-mono",
//   weight: "100 900",
// });

export const metadata = {
  title: "My Blog App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={outfit.className}
      >
        {children}
      </body>
    </html>
  );
}
