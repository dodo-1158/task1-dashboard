import React from 'react'
import styles from './page.module.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faEllipsisVertical,
    faEdit,
    faUserShield,
} from "@fortawesome/free-solid-svg-icons";
import Breadcrumb from "../../../../components/Breadcrumb/Breadcrumb";
import GroupUsersList from "../../../../components/GroupUsers/GroupUsersList"
import { faCalendar } from '@fortawesome/free-regular-svg-icons';

const devmodeGroups = () => {

    const initialRoleData = {
        id: 1,
        name: "Devmode Group",
        description:
            "System administrators, also known as sysadmins, are IT professionals who ensure computer systems are functioning and meet organizational needs.",
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

            <div className={styles.list}>
                <GroupUsersList />
            </div>
        </div>
    )
}

export default devmodeGroups