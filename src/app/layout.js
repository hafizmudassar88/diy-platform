import { Inter } from "next/font/google";
import "./globals.css";
import AppProvider from "../contexts/AppProvider";

import { Toaster } from "react-hot-toast";
import ClientLayout from "./clientLayout";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "DIY",
  description: "No Code Platform",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta name="msapplication-TileColor" content="#DA532C" />
        <meta
          name="msapplication-config"
          content="/favicon/browserconfig.xml"
        />
        <meta name="theme-color" content="#FFFFFF" />
      </head>
      <body
        className={`${inter.className} h-screen grid grid-rows-[auto_1fr_auto]`} // Fixed template string
      >
        <Toaster position="top-center" reverseOrder={false} />
        <AppProvider>
          <ClientLayout>{children}</ClientLayout>
        </AppProvider>
      </body>
    </html>
  );
}
