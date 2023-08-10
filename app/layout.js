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
      <body
        className={inter.className}
        style={{
          background: "#fff",
          // background:
          //   "radial-gradient(circle, rgba(232,231,229,1) 0%, rgba(176,210,210,1) 46%, rgba(157,193,220,1) 95%);",
        }}
      >
        <Provider>
          <Nav />

          {children}
        </Provider>
      </body>
    </html>
  );
}
