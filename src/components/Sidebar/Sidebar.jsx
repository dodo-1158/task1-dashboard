"use client";
import React, { useState, useEffect, useRef } from 'react';
import styles from './sidebar.module.css';
import { FaTachometerAlt, FaUsers, FaUserShield, FaUser, FaBuilding, FaLayerGroup, FaServicestack, FaClipboardList, FaKey, FaFileInvoice, FaCog, FaBars } from "react-icons/fa";
import Link from 'next/link';

const Sidebar = () => {
  const [isSidebarVisible, setSidebarVisible] = useState(false);

  const toggleSidebar = () => {
    setSidebarVisible(!isSidebarVisible);
  };

  // Ensure the sidebar is visible if the screen size is larger than 768px
  useEffect(() => {
    const handleResize = () => {

      if (window.innerWidth > 768) {
        setSidebarVisible(true);
      }

      if (window.innerWidth < 768) {
        setSidebarVisible(false);
      }


    }
      ;
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);



  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setSidebarVisible(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    //a tag instead of button in sidebar
    <div ref={dropdownRef} className={`${styles.sidebar} ${isSidebarVisible ? styles.hidden : ''}`}>
      <a className={styles.toggleButton} onClick={toggleSidebar}>
        <FaBars className={styles.menu} />
      </a>
      <ul className={styles.navList}>
        <li><FaTachometerAlt className={styles.icon} /><Link href="/" onClick={toggleSidebar}>Dashboard</Link></li>
        <li><FaUsers className={styles.icon} /><Link href="/partner" onClick={toggleSidebar}>Partners</Link></li>
        <li><FaUserShield className={styles.icon} /><Link href="/roles" onClick={toggleSidebar}>Roles</Link></li>
        <li><FaUser className={styles.icon} /><Link href="/users" onClick={toggleSidebar}>Users</Link></li>
        <li><FaBuilding className={styles.icon} /><Link href="/department" onClick={toggleSidebar}>Department</Link></li>
        <li><FaLayerGroup className={styles.icon} /><Link href="/groups" onClick={toggleSidebar}>Groups</Link></li>
        <li><FaServicestack className={styles.icon} /><Link href="/services" onClick={toggleSidebar}>Services</Link></li>
        <li><FaClipboardList className={styles.icon} /><Link href="/plans" onClick={toggleSidebar}>Plans</Link></li>
        <li><FaKey className={styles.icon} /><Link href="/license" onClick={toggleSidebar}>License</Link></li>
        <li><FaFileInvoice className={styles.icon} /><Link href="/billdesk" onClick={toggleSidebar}>Bill Desk</Link></li>
        <li><FaCog className={styles.icon} /><Link href="/settings" onClick={toggleSidebar}>Settings</Link></li>
      </ul>
    </div>
  );
};

export default Sidebar;
