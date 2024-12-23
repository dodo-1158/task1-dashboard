// Navbar.jsx
"use client"
import React, { useEffect, useRef, useState } from 'react'
import styles from './navbar.module.css'
import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faUser,
  faBell,
  faMessage,
  faCaretDown,
  faRightFromBracket,
  faGear,
  faCircleQuestion
} from '@fortawesome/free-solid-svg-icons'

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setOpen((prev) => !prev);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className={styles.container}>
      <Link href="/dashboard" className={styles.logo}>
        <FontAwesomeIcon icon={faUser} className={styles.logoIcon} />
      </Link>

      <div className={styles.links}>
        <Link href="#" className={styles.hideOnMobile}>
          <FontAwesomeIcon icon={faBell} className={styles.navIcon} />
        </Link>

        <Link href="#" className={styles.hideOnMobile}>
          <FontAwesomeIcon icon={faMessage} className={styles.navIcon} />
        </Link>

        <div className={styles.profileSection}>
          <div className={styles.navImgProfile}>
            <FontAwesomeIcon icon={faUser} />
          </div>

          <FontAwesomeIcon
            icon={faCaretDown}
            className={styles.navIcon}
            ref={dropdownRef}
            onClick={toggleDropdown}
          />
        </div>

        {open && (
          <div className={styles.dropdown}>
            <ul>
              {/* Show these items only on mobile */}
              <div className={styles.mobileOnlySection}>
                <li className={styles.mobileNavItem}>
                  <FontAwesomeIcon icon={faBell} className={styles.dropdownIcon} />
                  <span>Notifications</span>
                </li>
                <li className={styles.mobileNavItem}>
                  <FontAwesomeIcon icon={faMessage} className={styles.dropdownIcon} />
                  <span>Chat</span>
                </li>
              </div>

              {/* These items always show */}
              <li>
                <FontAwesomeIcon icon={faUser} className={styles.dropdownIcon} />
                <span>Profile</span>
              </li>
              <li>
                <FontAwesomeIcon icon={faGear} className={styles.dropdownIcon} />
                <span>Settings</span>
              </li>
              <li>
                <FontAwesomeIcon icon={faCircleQuestion} className={styles.dropdownIcon} />
                <span>Need Help</span>
              </li>
              <li>
                <FontAwesomeIcon icon={faRightFromBracket} className={styles.dropdownIcon} />
                <span>Logout</span>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  )
}

export default Navbar