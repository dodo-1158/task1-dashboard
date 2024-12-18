import React from "react";
import styles from "./cardsgroup.module.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsers, faCogs, faUser, faBuilding, faUserGroup, faShieldAlt } from '@fortawesome/free-solid-svg-icons';

const cardData = [
  { id: 1, title: "Partner", icon: faUsers },
  { id: 2, title: "Roles", icon: faCogs },
  { id: 3, title: "Users", icon: faUser },
  { id: 4, title: "Department", icon: faBuilding },
  { id: 5, title: "Groups", icon: faUserGroup },
  { id: 6, title: "Permissions", icon: faShieldAlt },
];

const CardsGroup = () => {
  return (
    <div className={styles.cardGroup}>
      {cardData.map((card) => (
        <div key={card.id} className={styles.card}>
          <FontAwesomeIcon className={styles.icon} icon={card.icon} />
          <span className={styles.title}>{card.title}</span>
          <span className={styles.plus}>+</span>
        </div>
      ))}
    </div>
  );
};

export default CardsGroup;
