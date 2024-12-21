"use client";
import React, { useState, useEffect, useRef } from "react";
import styles from "./page.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faFilter,
  faSync,
  faTh,
  faPlay,
  faEdit,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
import Link from "next/link";
import { urlToUrlWithoutFlightMarker } from "next/dist/client/components/router-reducer/fetch-server-response";

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
    name: "System Admin",
    owner: "Admin user",
    lastModified: "2024-08-30T19:30:00",
    modifiedBy: "Admin user",
    status: "Active",
    avatarUrl: "/slide1.jpg",
    url: "/dashboard/roles/systemAdmin"

  },
  {
    id: 2,
    name: "IT User",
    owner: "Admin user",
    lastModified: "2024-08-30T19:30:00",
    modifiedBy: "Admin user",
    status: "Inactive",
    avatarUrl: "/slide2.jpg",
    url: "/dashboard/roles/itUser"
  },
  {
    id: 3,
    name: "IT Support",
    owner: "Admin user",
    lastModified: "2024-08-30T19:30:00",
    modifiedBy: "Admin user",
    status: "Inactive",
    avatarUrl: "/slide3.jpg",
    url: "/dashboard/roles/itSupport"
  },
];


const Roles = () => {
  const [rows, setRows] = useState(data);
  const [openMenu, setOpenMenu] = useState(null);



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

  return (

    <div className={styles.container}>
      {/* Header Section */}
      <div className={styles.header}>
        <h1 className={styles.title}>Role</h1>
        <div className={styles.controls}>
          <div className={styles.searchBar}>
            <FontAwesomeIcon icon={faSearch} className={styles.icon} />
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
                  {/* Use Next.js Image component */}
                  <Image
                    src={row.avatarUrl} // Avatar image URL
                    alt={`${row.name} avatar`} // Alt text for accessibility
                    className={styles.avatar} // Apply styling to the avatar
                    width={40} // Set image width
                    height={40} // Set image height
                    objectFit="cover" // Ensure the image covers the area
                  />
                  <Link href={row.url}> {row.name} </Link>
                </div>
              </td>
              <td>{row.owner}</td>
              <td>{formatDate(row.lastModified)}</td> {/* Format the date */}
              <td>{row.modifiedBy}</td>
              <td
                className={`${styles.status} ${row.status === "Active" ? styles.active : styles.inactive
                  }`}
              >
                {row.status}
              </td>
              <td>
                <div className={styles.actionWrapper} >
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

      {/* Pagination Section */}
      <div className={styles.pagination}>
        <button className={styles.navButton}>«</button>
        <span>1</span>
        <button className={styles.navButton}>»</button>
      </div>
    </div>
  );

}

export default Roles





