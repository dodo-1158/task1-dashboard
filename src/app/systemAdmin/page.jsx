"use client";
import React, { useEffect, useState, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faEllipsisVertical,
    faFilter,
    faSync,
    faTableCells,
    faChevronUp,
    faChevronDown,
    faEdit,
    faTrash,
    faSearch,
    faTh,
    faPlay,
    faUserShield,
    faCheck,
    faTimes,

} from "@fortawesome/free-solid-svg-icons";
import Breadcrumb from "@/components/Breadcrumb/Breadcrumb";
import styles from "./page.module.css";
import Image from "next/image"; // Make sure you import the Image component
import { faCalendar } from "@fortawesome/free-regular-svg-icons";

// Utility function to format date
const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString("en-US", {
        weekday: "short", // "Mon"
        year: "numeric",  // "2024"
        month: "short",   // "Dec"
        day: "numeric",   // "17"
        hour: "numeric",  // "7 PM"
        minute: "numeric", // "30"
    });
};

const data = [
    {
        id: 1,
        name: "SVS Convent School",
        owner: "Admin user",
        lastModified: "2024-08-30T19:30:00", // ISO 8601 format
        modifiedBy: "Admin user",
        status: "Active",
        avatarUrl: "/slide1.jpg", // Avatar image URL
    },
    {
        id: 2,
        name: "SVS Convent School",
        owner: "Admin user",
        lastModified: "2024-08-30T19:30:00", // ISO 8601 format
        modifiedBy: "Admin user",
        status: "Inactive",
        avatarUrl: "/slide2.jpg", // Avatar image URL
    },
    {
        id: 3,
        name: "SVS Convent School",
        owner: "Admin user",
        lastModified: "2024-08-30T19:30:00", // ISO 8601 format
        modifiedBy: "Admin user",
        status: "Inactive",
        avatarUrl: "/slide3.jpg", // Avatar image URL
    },
];

const initialRoleData = {
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
};

const SystemAdmin = () => {
    const [rows, setRows] = useState(data);
    const [openMenu, setOpenMenu] = useState(null);
    const menuRef = useRef(null);
    const [isClient, setIsClient] = useState(false); // To check if we are on the client side

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (menuRef.current && !menuRef.current.contains(e.target)) {
                setOpenMenu(null);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    // Set the client-side state
    useEffect(() => {
        setIsClient(true);
    }, []);

    const toggleMenu = (id) => {
        setOpenMenu(openMenu === id ? null : id);
    };

    const handleAction = (id, action) => {
        const updatedRows = rows.map((row) => {
            if (row.id === id) {
                if (action === "activate") {
                    // Toggle the status between 'Active' and 'Inactive'
                    row.status = row.status === "Active" ? "Inactive" : "Active";
                } else if (action === "delete") {
                    return null;
                }
            }
            return row;
        });
        setRows(updatedRows.filter(Boolean)); // Remove deleted items
        setOpenMenu(null);
    };

    const [expandedSections, setExpandedSections] = useState({});
    const [editable, setEditable] = useState({});
    const [services, setServices] = useState(initialRoleData.services);
    const [activeTab, setActiveTab] = useState("Policy");

    const toggleSection = (section) => {
        setExpandedSections((prevState) => ({
            ...prevState,
            [section]: !prevState[section],
        }));
    };

    const toggleEditable = (section, index) => {
        setEditable((prevState) => ({
            ...prevState,
            [`${section}-${index}`]: !prevState[`${section}-${index}`],
        }));
    };

    const handleInputChange = (section, index, field, value) => {
        const updatedServices = { ...services };
        updatedServices[section][index][field] = value;
        setServices(updatedServices);
    };

    const handleTabClick = (tab) => {
        setActiveTab(tab);
    };

    return (
        <div className={styles.container}>
            <Breadcrumb />
            <div className={styles.topWrapper}>
                <div className={styles.top}>
                    <div className={styles.menu}>
                        <h1 className={styles.title}>{initialRoleData.name}</h1>
                        <FontAwesomeIcon icon={faEllipsisVertical} className={styles.icon} />
                    </div>
                    <p className={styles.desc}>{initialRoleData.description}</p>
                </div>

                <div className={styles.info}>
                    <div>
                        <FontAwesomeIcon className={styles.icon} icon={faUserShield} />
                        <span className={styles.title}>Admin User</span>
                    </div>

                    <div>
                        <FontAwesomeIcon className={styles.icon} icon={faCalendar} />
                        <span className={styles.title}>30, Aug 7:30 PM</span>
                    </div>


                    <div>
                        <FontAwesomeIcon className={styles.icon} icon={faEdit} />
                        <span className={styles.title}>Shweta</span>

                    </div>

                </div>
            </div>

            <div className={styles.header}>
                <div className={styles.tabs}>
                    <button
                        onClick={() => handleTabClick("Policy")}
                        className={`${styles.tabButton} ${activeTab === "Policy" ? styles.activeTab : ""}`}
                    >
                        Policy
                    </button>
                    <button
                        onClick={() => handleTabClick("Users")}
                        className={`${styles.tabButton} ${activeTab === "Users" ? styles.activeTab : ""}`}
                    >
                        Users
                    </button>
                </div>

            </div>

            <div className={styles.content}>
                {activeTab === "Policy" && (

                    <div className={styles.policysection}>
                        <div className={styles.editIcon}>
                            <FontAwesomeIcon className={styles.editicon} icon={faEdit} />
                        </div>
                        <div className={styles.policyContent}>

                            <div>
                                {Object.keys(services).map((section) => (
                                    <div key={section}>
                                        <div
                                            className={styles.sectionHeader}
                                            onClick={() => toggleSection(section)}
                                        >
                                            <h3>{section}</h3>
                                            <FontAwesomeIcon
                                                icon={expandedSections[section] ? faChevronUp : faChevronDown}
                                                className={styles.icon}
                                            />
                                        </div>
                                        {expandedSections[section] && (
                                            <table className={styles.table}>
                                                <thead>
                                                    <tr>
                                                        <th>Name</th>
                                                        <th>Create</th>
                                                        <th>Update</th>
                                                        <th>Delete</th>
                                                        <th>Get</th>
                                                        <th>List</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {services[section].map((service, index) => (
                                                        <tr key={index}>
                                                            <td>{service.name}</td>
                                                            {["create", "update", "delete", "get", "list"].map((perm) => (
                                                                <td key={perm}>
                                                                    <span
                                                                        className={`${styles.permissionIcon} ${service.permissions.includes(perm)
                                                                            ? styles.greenCircle
                                                                            : styles.redCircle
                                                                            }`}
                                                                    >
                                                                        <FontAwesomeIcon
                                                                            icon={
                                                                                service.permissions.includes(perm)
                                                                                    ? faCheck
                                                                                    : faTimes
                                                                            }
                                                                        />
                                                                    </span>
                                                                </td>
                                                            ))}
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>

                    </div>
                )}

                {/* Render "Users" tab only on client side */}
                {isClient && activeTab === "Users" && (
                    <div>
                        <div className={styles.headercontrols}>
                            <div className={styles.controls}>
                                <div className={styles.searchBar}>
                                    <FontAwesomeIcon icon={faSearch} className={styles.Controlsicon} />
                                    <input type="text" placeholder="Search" />
                                </div>
                                <FontAwesomeIcon icon={faFilter} className={styles.icon} />
                                <FontAwesomeIcon icon={faSync} className={styles.icon} />
                                <FontAwesomeIcon icon={faTh} className={styles.icon} />
                            </div>
                        </div>

                        {/* Table Section */}
                        <table className={styles.table}>
                            <thead>
                                <tr>
                                    <th>NAME</th>
                                    <th>OWNER</th>
                                    <th>LAST MODIFIED</th>
                                    <th>MODIFIED BY</th>
                                    <th>STATUS</th>
                                    <th>ACTION</th>
                                </tr>
                            </thead>
                            <tbody>
                                {rows.map((row) => (
                                    <tr key={row.id} className={styles.row}>
                                        <td className={styles.cell}>
                                            <div className={styles.profile}>

                                                <Image
                                                    src={row.avatarUrl}
                                                    alt={`${row.name} avatar`}
                                                    className={styles.avatar}
                                                    width={40}
                                                    height={40}
                                                    objectFit="cover"
                                                />
                                                {row.name}
                                            </div>
                                        </td>
                                        <td>{row.owner}</td>
                                        <td>{formatDate(row.lastModified)}</td>
                                        <td>{row.modifiedBy}</td>
                                        <td
                                            className={`${styles.status} ${row.status === "Active" ? styles.active : styles.inactive
                                                }`}
                                        >
                                            {row.status}
                                        </td>
                                        <td>
                                            <div className={styles.actionWrapper} ref={menuRef}>
                                                <button
                                                    onClick={() => toggleMenu(row.id)}
                                                    className={styles.actionButton}
                                                >
                                                    ▼
                                                </button>
                                                {openMenu === row.id && (
                                                    <div className={styles.dropdown}>
                                                        <button
                                                            onClick={() => handleAction(row.id, "activate")}
                                                            className={styles.dropdownItem}
                                                        >
                                                            <FontAwesomeIcon icon={faPlay} />{" "}
                                                            {row.status === "Active" ? "Deactivate" : "Activate"}
                                                        </button>
                                                        <button
                                                            onClick={() => handleAction(row.id, "edit")}
                                                            className={styles.dropdownItem}
                                                        >
                                                            <FontAwesomeIcon icon={faEdit} /> Edit
                                                        </button>
                                                        <button
                                                            onClick={() => handleAction(row.id, "delete")}
                                                            className={styles.dropdownItem}
                                                        >
                                                            <FontAwesomeIcon icon={faTrash} /> Delete
                                                        </button>
                                                    </div>
                                                )}
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
};

export default SystemAdmin;
