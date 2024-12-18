import Image from "next/image";
import styles from "./newscard.module.css";
import React from "react";

const newsData = [
  {
    id: 1,
    image: "/blog.jpg", 
    title: "Suspect arrested in shooting death of title-winning college gymnast",
  },
  {
    id: 2,
    image: "/blog.jpg",
    title: "College celebrates victory in inter-state gymnastics championship",
  },
  {
    id: 3,
    image: "/blog.jpg", 
    title: "Upcoming reforms in sports education announced by the college board",
  },
];

const NewsCard = () => {
  return (
    <div className={styles.container}>
      {newsData.map((news) => (
        <div key={news.id} className={styles.card}>
          <div className={styles.imageContainer}>
            <Image
              src={news.image}
              alt="News Image"
              width={100}
              height={100}
              layout="responsive"
            />
          </div>
          <div className={styles.content}>
            <h3>{news.title}</h3>
          </div>
        </div>
      ))}
    </div>
  );
};

export default NewsCard;
