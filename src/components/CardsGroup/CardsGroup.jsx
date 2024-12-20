import React from "react";
import styles from "./cardsgroup.module.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsers, faCogs, faUserShield, faLayerGroup, faUser, faBuilding, faUserGroup, faServicestack, faShieldAlt } from '@fortawesome/free-solid-svg-icons';
import Link from "next/link";

const cardData = [
  { id: 1, title: "Partner", icon: faUsers, url: "/partner" },
  { id: 2, title: "Roles", icon: faUserShield, url: "/roles" },
  { id: 3, title: "Users", icon: faUser, url: "/users" },
  { id: 4, title: "Department", icon: faBuilding, url: "/department" },
  { id: 5, title: "Groups", icon: faLayerGroup, url: "/groups" },
  { id: 6, title: "Services", icon: faShieldAlt, url: "/services" },
];

//faCogs
const CardsGroup = () => {
  return (
    <div className={styles.cardGroup}>
      {cardData.map((card) => (
        <Link href={card.url} >
          <div key={card.id} className={styles.card}>
            <FontAwesomeIcon className={styles.icon} icon={card.icon} />
            <span className={styles.title}>{card.title}</span>
            <span className={styles.plus}>+</span>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default CardsGroup;
