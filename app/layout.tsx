import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { SideBar } from "./components/SideBar/SideBar";
import AudioPlayer from "./components/AudioPlayer/AudioPlayer";
import styles from './layout.module.scss'
import { RecoilWrapper } from "./components/RecoilWrapper/RecoilWrapper";
import { MobileNavbar } from "./components/MobileNavbar/MobileNavbar";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};


const plusJakartaPlus = Plus_Jakarta_Sans({
  weight: ["500", "800"],
  style: "normal",  
  variable: "--font-jakarta-suns",
  subsets : ["latin"]
});



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;

}>)
 {
  return (
    <html lang="en">
    
      <body className={`${plusJakartaPlus.variable}`}>
        <div className={styles.mainContent}>
          <RecoilWrapper>
            {children}
          </RecoilWrapper>
        </div>
      </body>
    </html>
  );
}
