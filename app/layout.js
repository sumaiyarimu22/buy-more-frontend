import { Inter } from "next/font/google";
import "./globals.css";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import Navigation from "./components/Navigation/Navigation.jsx";

import ReduxProvider from "./peoviders/ReduxProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Toy Haven - Your One-Stop Toy Shop",
  description:
    "Explore a world of joy with our wide range of toys for all ages. Find the perfect toys for your kids at Toy Haven.",
  keywords: "toys, games, play, kids, fun, educational toys",
  author: "Toy Haven Inc.",
};

export default function RootLayout({ children }) {
  return (
    <html lang='en'>
      <body className={inter.className}>
        <ReduxProvider>
          <ToastContainer />
          <div className='flex bg-black min-h-screen text-white'>
            <Navigation />
            {children}
          </div>
        </ReduxProvider>
      </body>
    </html>
  );
}
