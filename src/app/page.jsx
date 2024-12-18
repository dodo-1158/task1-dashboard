import Image from "next/image";
import styles from "./page.module.css";
import ImageSlider from "../components/Slider/Slider";
import NewsCard from "../components/NewsCard/NewsCard";
import CardsGroup from "../components/CardsGroup/CardsGroup";

const Data = [
  {
    id: 1,
    name: "Vijay Nagar",
    desc: "A person is a being who has certain capacities or attributes such as reason, morality, consciousness or self-consciousness.",
    img: "/teacher.jpg",
  },
  {
    id: 2,
    name: "Vijay Nagar",
    desc: "A person is a being who has certain capacities or attributes such as reason, morality, consciousness or self-consciousness.",
    img: "/teacher.jpg",
  },
  {
    id: 3,
    name: "Vijay Nagar",
    desc: "A person is a being who has certain capacities or attributes such as reason, morality, consciousness or self-consciousness.",
    img: "/teacher.jpg",
  },


];

export default function Home() {
  return (
    <>
      {/* Description Section */}
      <div className={styles.container}>
        <div className={styles.left}>
          <div className={styles.desc}>
            <h1>SVS Convent School</h1>
            <p>
              Schools are organized spaces purposed for teaching and learning.
              The classrooms where teachers teach and students learn are of
              central importance.
            </p>
          </div>
        </div>

        {/* Center Section */}
        <div className={styles.center}>
          <ImageSlider />
        </div>

        {/* News Section */}
        <div className={styles.right}>
          <NewsCard />
        </div>
      </div>

      {/* Cards Section */}
      <div className={styles.cards}>
        <CardsGroup />
      </div>

      {/* Faculty Section */}
      <div className={styles.section2}>
        <h1>Meet the Faculties</h1>
        <div className={styles.facultyCards}>
          {Data.map((data) => (
            <div key={data.id} className={styles.card}>
              <h2>{data.name}</h2>
              <p>{data.desc}</p>
              <div className={styles.img}>
                <Image
                  src={data.img}
                  alt="faculty"
                  width={500}   
                  height={400}  
                  className={styles.facultyimg}
                  quality={100}  
                  layout="intrinsic"  
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
