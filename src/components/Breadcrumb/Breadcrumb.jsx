"use client";

import React from "react";
import Link from "next/link";
import { FaHome } from "react-icons/fa";
import { usePathname } from "next/navigation";

const Breadcrumb = ({ name }) => {
    // Use the 'name' prop if provided, otherwise use pathname from usePathname
    const pathname = name || usePathname();

    // Ensure pathname is a string
    if (typeof pathname !== "string") {
        console.error("Invalid pathname:", pathname);
        return null; // Or handle the error accordingly
    }

    // Remove the 'dashboard' part from the path to keep 'HOME' as the root
    const pathArray = pathname
        .replace("/dashboard", "") // Treat '/dashboard' as the root
        .split("/")
        .filter((path) => path);

    return (
        <div style={{ display: "flex", alignItems: "center", fontSize: "14px" }}>
            {/* Home link */}
            <Link
                href="/dashboard"
                style={{
                    display: "flex",
                    alignItems: "center",
                    color: "black",
                    textDecoration: "none",
                    fontWeight: "bold",
                }}
            >
                <FaHome style={{ marginRight: "5px" }} />
                HOME
            </Link>
            {/* Breadcrumb paths */}
            {pathArray.map((path, index) => {
                const href = `/dashboard/${pathArray.slice(0, index + 1).join("/")}`;
                const isLast = index === pathArray.length - 1;

                return (
                    <React.Fragment key={href}>
                        <span style={{ margin: "0 5px" }}>{">"}</span>
                        {isLast ? (
                            // Last breadcrumb item is not bold
                            <span style={{ textTransform: "uppercase" }}>
                                {decodeURIComponent(path)}
                            </span>
                        ) : (
                            // Non-last breadcrumb items are bold
                            <Link
                                href={href}
                                style={{
                                    textTransform: "uppercase",
                                    textDecoration: "none",
                                    color: "black",
                                    fontWeight: "bold",
                                }}
                            >
                                {decodeURIComponent(path)}
                            </Link>
                        )}
                    </React.Fragment>
                );
            })}
        </div>
    );
};

export default Breadcrumb;
