"use client";
import Hero from "@components/HeroSection/Hero";
import Nav from "@components/Nav/Nav";
import Provider from "@components/Provider";
import "@styles/globals.css";
import { Inter } from "next/font/google";
import { Provider as ReduxProvider } from "react-redux";
import { store } from "@Reducers/store";

const inter = Inter({ subsets: ["latin"] });

// export const metadata = {
//   title: "Kodikas 2k23",
//   description: "Unlock your coding pottential!",
// };

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <title>Kodikas 2k23</title>
      <body>
        <Provider>
          <ReduxProvider store={store}>
            <div className="main">
              <div className="gradient"></div>
            </div>
            <div className="relative z-10">
              <Nav />
              <div className="w-full h-auto mt-16">{children}</div>
            </div>
          </ReduxProvider>
        </Provider>
      </body>
    </html>
  );
}
