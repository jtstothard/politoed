import { type AppType } from "next/app";

import { api } from "~/lib/api";

import "@total-typescript/ts-reset";
import "~/styles/globals.css";

import { Inter as FontSans } from "next/font/google"

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
})

const MyApp: AppType = ({ Component, pageProps }) => {
  return <main className={fontSans.className}>
    <Component {...pageProps} />;
  </main>
};

export default api.withTRPC(MyApp);
