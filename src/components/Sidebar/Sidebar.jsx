"use client";
import React, { useState, useEffect, useRef } from "react";
import styles from "./sidebar.module.css";
import {
  FaTachometerAlt,
  FaUsers,
  FaUserShield,
  FaShieldAlt,
  FaUser,
  FaBuilding,
  FaLayerGroup,
  FaServicestack,
  FaClipboardList,
  FaKey,
  FaFileInvoice,
  FaCog,
  FaBars,
} from "react-icons/fa";
import Link from "next/link";

const Sidebar = () => {
  const [activeLink, setActiveLink] = useState("/");
  const [isSidebarVisible, setSidebarVisible] = useState(false);

  const toggleSidebar = () => {
    setSidebarVisible(!isSidebarVisible);
  };

  const handleLinkClick = (path) => {
    setActiveLink(path);
    if (window.innerWidth < 768) {
      setSidebarVisible(false);
    }
  };

  useEffect(() => {
    const handleResize = () => {
      setSidebarVisible(window.innerWidth > 768);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div
      className={`${styles.sidebar} ${isSidebarVisible ? styles.visible : styles.hidden
        }`}
    >
      <a className={styles.toggleButton} onClick={toggleSidebar}>
        <FaBars className={styles.menu} />
      </a>

      <ul className={styles.navList}>
        {[
          { path: "/", label: "Dashboard", icon: <FaTachometerAlt /> },
          { path: "/partner", label: "Partners", icon: <FaUsers /> },
          { path: "/roles", label: "Roles", icon: <FaUserShield /> },
          { path: "/users", label: "Users", icon: <FaUser /> },
          { path: "/department", label: "Department", icon: <FaBuilding /> },
          { path: "/groups", label: "Groups", icon: <FaLayerGroup /> },
          { path: "/services", label: "Services", icon: <FaShieldAlt /> },
          { path: "/plans", label: "Plans", icon: <FaClipboardList /> },
          { path: "/license", label: "License", icon: <FaKey /> },
          { path: "/billdesk", label: "Bill Desk", icon: <FaFileInvoice /> },
          { path: "/settings", label: "Settings", icon: <FaCog /> },
        ].map((link) => (
          <li
            key={link.path}
            className={`${styles.navItem} ${activeLink === link.path ? styles.active : ""
              }`}
            onClick={() => handleLinkClick(link.path)}
          >
            {link.icon}
            <Link href={link.path}>{link.label}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
