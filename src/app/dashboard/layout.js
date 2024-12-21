import { Inter } from "next/font/google";
import "../../app/globals.css";
import Navbar from "../../components/Navbar/Navbar";
import Sidebar from "../../components/Sidebar/Sidebar";
import React from 'react'
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
    title: "School Dashboard",
    description: "Dashboard",
};


const layout = ({ children }) => {
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

export default layout