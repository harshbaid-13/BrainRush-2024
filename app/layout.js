import Hero from "@components/HeroSection/Hero";
import Nav from "@components/Nav/Nav";
import Provider from "@components/Provider";
import "@styles/globals.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Kodikas 2k23",
  description: "Unlock your coding pottential!",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className} style={{ backgroundColor: "#0F172A" }}>
        <Provider>
          <Nav />
          {/* <Hero /> */}
          {children}
        </Provider>
      </body>
    </html>
  );
}