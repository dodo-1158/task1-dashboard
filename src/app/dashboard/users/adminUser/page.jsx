"use client";
import React, { useEffect, useState, useRef, startTransition } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faEllipsisVertical,
    faEdit,
    faUserShield,
    faUserTie,
    faBuilding,

} from "@fortawesome/free-solid-svg-icons";
import Breadcrumb from "../../../../components/Breadcrumb/Breadcrumb";
import styles from "./page.module.css";
import Image from "next/image";
import AdminPic from '../../../../../public/teacher.jpg'// Make sure you import the Image component
import { faCalendar } from "@fortawesome/free-regular-svg-icons";
import AttendanceCalendar from "../../../../components/Calendar/AttendanceCalendar";

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





const User = () => {

    const activities = [
        {
            id: 1,
            user: "Divya",
            timeAgo: "5 days",
            action: "Added new role with name",
            target: "Admin",
            avatar: "/person.jpg"
        },
        {
            id: 2,
            user: "Divya",
            timeAgo: "3 days",
            action: "Added new role with name",
            target: "Admin",
            avatar: "/person.jpg"
        },
        {
            id: 3,
            user: "Divya",
            timeAgo: "2 days",
            action: "Added new role with name",
            target: "Admin",
            avatar: "/person.jpg"
        }
    ];




    return (
        <div className={styles.container}>
            <Breadcrumb />

            <div className={styles.topWrapper}>
                <div className={styles.left}>

                    <div className={styles.extremeleft}>
                        <div className={styles.imgWrapper}>
                            <Image className={styles.img} src={AdminPic} alt="Admin" />
                        </div>
                        <div className={styles.content}>
                            <h1 className={styles.title}>Admin User</h1>
                            <div className={styles.subtitles}>
                                <div className={styles.subtitle}>
                                    <FontAwesomeIcon className={styles.icon} icon={faUserTie} />
                                    System Admin
                                </div>
                                <div className={styles.subtitle}>
                                    <FontAwesomeIcon className={styles.icon} icon={faBuilding} />
                                    Account Department
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className={styles.menu}>
                        <FontAwesomeIcon icon={faEllipsisVertical} className={styles.lefticon} />
                    </div>

                </div>


                <div className={styles.info}>
                    <div>
                        <FontAwesomeIcon className={styles.icon} icon={faUserShield} />
                        <span className={styles.title}>Admin User</span>
                    </div>
                    <div>
                        <FontAwesomeIcon className={styles.icon} icon={faCalendar} />
                        <span className={styles.title}>30 Aug, 7:30 PM</span>
                    </div>
                    <div>
                        <FontAwesomeIcon className={styles.icon} icon={faEdit} />
                        <span className={styles.title}>Shweta</span>
                    </div>
                </div>
            </div>

            <section className={styles.tophalf}>
                <AttendanceCalendar />
            </section>

            {/* <section className={styles.bottomhalf}>

                <div className={styles.card}>
                    <h2 className={styles.cardtitle}>Recent Activities</h2>
                    <div className={styles.activitylist}>
                        {activities.map((activity) => (
                            <div key={activity.id} className={styles.activityitem}>
                                <Image
                                    width={100}
                                    height={100}
                                    src={activity.avatar}
                                    alt={activity.user}
                                    className={styles.avatar}
                                />
                                <div className={styles.activitycontent}>
                                    <div className={styles.activityheader}>
                                        <span className={styles.username}>{activity.user}</span>
                                        <span className={styles.timeAgo}>{activity.timeAgo}</span>
                                    </div>
                                    <p className={styles.activitytext}>
                                        {activity.action} <span className={styles.targetText}>{activity.target}</span>
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>


            </section> */}

            <section className={styles.bottomhalf}>
                <div className={styles.card}>
                    <h2 className={styles.cardtitle}>Recent Activities</h2>
                    <div className={styles.activitylist}>
                        {activities.map((activity) => (
                            <div key={activity.id} className={styles.activityitem}>
                                <div className={styles.avatarWrapper}>
                                    <Image
                                        width={40}
                                        height={40}
                                        src={activity.avatar}
                                        alt={activity.user}
                                        className={styles.avatar}
                                    />
                                </div>
                                <div className={styles.activitycontent}>
                                    <div className={styles.activityheader}>
                                        <span className={styles.username}>{activity.user}</span>
                                        <span className={styles.timeAgo}>{activity.timeAgo}</span>
                                    </div>
                                    <p className={styles.activitytext}>
                                        {activity.action} <span className={styles.targetText}>{activity.target}</span>
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>



        </div>



    );
};

export default User;
