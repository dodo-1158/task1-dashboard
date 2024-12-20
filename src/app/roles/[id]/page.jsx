"use client";

import React from "react";
import { useParams } from "next/navigation";
import styles from "./page.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle, faTimesCircle } from "@fortawesome/free-solid-svg-icons";

const roleData = {
    "system-admin": {
        id: 1,
        name: "System Admin",
        description:
            "System administrators, also known as sysadmins, are IT professionals who ensure computer systems are functioning and meet organizational needs.",
        services: {
            "Library Services": [
                { name: "Library", permissions: ["get", "list"] },
                { name: "Author", permissions: ["create", "update", "delete", "get", "list"] },
                { name: "Publication", permissions: ["create", "update", "delete", "get", "list"] },
                { name: "Book", permissions: ["create", "update", "delete", "get", "list"] },
                { name: "Book Issue", permissions: ["create", "update", "delete", "get", "list"] },
                { name: "Penalty", permissions: ["create", "update", "delete", "get", "list"] },
                { name: "Library Policy", permissions: ["create", "update", "delete", "get", "list"] },
            ],
            "Academic Services": [],
            "Examination Services": [],
        },
    },

};

const RoleDetails = () => {
    const { id } = useParams();

    // Fetch role data based on the ID
    const role = roleData[id];

    if (!role) {
        return <p>Role not found!</p>;
    }

    // Helper function to render permissions using FontAwesome icons
    const renderPermission = (permissions, action) => {
        return permissions.includes(action) ? (
            <FontAwesomeIcon icon={faCheckCircle} className={styles.iconCheck} />
        ) : (
            <FontAwesomeIcon icon={faTimesCircle} className={styles.iconCross} />
        );
    };

    return (
        <div className={styles.container}>
            <h1>{role.name}</h1>
            <p>{role.description}</p>

            {/* Render Services and Permissions */}
            {Object.entries(role.services).map(([serviceName, items]) => (
                <div key={serviceName} className={styles.section}>
                    <h2>{serviceName}</h2>
                    {items.length > 0 ? (
                        <table className={styles.table}>
                            <thead>
                                <tr>
                                    <th>NAME</th>
                                    <th>CREATE</th>
                                    <th>UPDATE</th>
                                    <th>DELETE</th>
                                    <th>GET</th>
                                    <th>LIST</th>
                                </tr>
                            </thead>
                            <tbody>
                                {items.map((item) => (
                                    <tr key={item.name}>
                                        <td>{item.name}</td>
                                        <td>{renderPermission(item.permissions, "create")}</td>
                                        <td>{renderPermission(item.permissions, "update")}</td>
                                        <td>{renderPermission(item.permissions, "delete")}</td>
                                        <td>{renderPermission(item.permissions, "get")}</td>
                                        <td>{renderPermission(item.permissions, "list")}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        <p>No items available</p>
                    )}
                </div>
            ))}
        </div>
    );
};

export default RoleDetails;
