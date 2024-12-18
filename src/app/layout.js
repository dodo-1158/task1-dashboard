import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "../components/navbar/Navbar";
import Sidebar from "../components/Sidebar/Sidebar";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "School Dashboard",
  description: "Dashboard",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {/* Navbar at the top */}
        <Navbar />

        {/* Main Layout */}
        <div className="main-layout">
          {/* Sidebar */}
          <Sidebar />

          {/* Content */}
          <div className="content-area">
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}
