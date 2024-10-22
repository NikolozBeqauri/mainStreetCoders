import type { Metadata } from "next";
import { Inter, Manrope, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import styles from './layout.module.scss'
import { RecoilWrapper } from "./components/RecoilWrapper/RecoilWrapper";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "YouSpoty",
  description: "Generated by YouSpoty app",
};

const plusJakartaPlus = Plus_Jakarta_Sans({
  weight: ["500", "600", "800", "200"],
  style: "normal",  
  variable: "--font-jakarta-sans",
  subsets: ["latin"]
});

const manrope = Manrope({
  weight: ["500"],
  variable: "--Manrope",
  subsets: ["latin"]
});



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;

}>)
 {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/images/favicon.png" />
      </head>
      <body className={`${plusJakartaPlus.variable} ${manrope.variable}`}>
        <div className={styles.mainContent}>
          <RecoilWrapper>
            {children}
          </RecoilWrapper>
        </div>
      </body>
    </html>
  );
}
function localFont(arg0: {}) {
  throw new Error("Function not implemented.");
}

