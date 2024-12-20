"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaHome } from "react-icons/fa";

const Breadcrumb = () => {
    const pathname = usePathname();
    const pathArray = pathname.split("/").filter((path) => path);

    return (
        <div style={{ display: "flex", alignItems: "center", fontSize: "14px" }}>
            <Link href="/" style={{ display: "flex", alignItems: "center", color: "black", textDecoration: "none", fontWeight: "bold" }}>
                <FaHome style={{ marginRight: "5px" }} />
                HOME


            </Link>
            {pathArray.map((path, index) => {
                const href = `/${pathArray.slice(0, index + 1).join("/")}`;
                const isLast = index === pathArray.length - 1;

                return (
                    <React.Fragment key={href}>
                        <span style={{ margin: "0 5px" }}>{">"}</span>
                        {isLast ? (
                            <span style={{ textTransform: "uppercase", fontWeight: "bold" }}>
                                {decodeURIComponent(path).replace(/-/g, " ")}
                            </span>
                        ) : (
                            <Link href={href} style={{ textTransform: "uppercase", textDecoration: "none", color: "black" }}>
                                {decodeURIComponent(path).replace(/-/g, " ")}
                            </Link>
                        )}
                    </React.Fragment>
                );
            })}
        </div>
    );
};

export default Breadcrumb;
