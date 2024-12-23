import { Inter } from "next/font/google";
import "./layout.css";
import Navbar from "../../components/Navbar/Navbar";
import SidebarAlt from "../../components/SidebarAlt/SidebarAlt";
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
                    <SidebarAlt />

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