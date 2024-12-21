import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, MoreVertical } from 'lucide-react';
import styles from "./page.module.css";  // Import the CSS module

const AttendanceCalendar = () => {
    const [currentDate, setCurrentDate] = useState(new Date(2024, 9)); // October 2024

    // Sample attendance data
    const attendanceData = {
        '2024-10-02': 'present',
        '2024-10-03': 'present',
        '2024-10-04': 'present',
        '2024-10-09': 'present',
        '2024-10-10': 'present',
        '2024-10-11': 'absent',
        '2024-10-12': 'absent',
        '2024-10-13': 'present',
        '2024-10-16': 'leave',
        '2024-10-17': 'leave',
        '2024-10-18': 'present',
        '2024-10-23': 'present',
        '2024-10-24': 'holiday',
        '2024-10-25': 'present',
        '2024-10-26': 'present',
        '2024-10-27': 'present',
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'present':
                return styles.presentDay;
            case 'absent':
                return styles.absentDay;
            case 'holiday':
                return styles.holidayDay;
            case 'leave':
                return styles.leaveDay;
            default:
                return styles.defaultDay;
        }
    };

    // Calendar logic remains the same
    const getDaysInMonth = (date) => {
        return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
    };

    const getFirstDayOfMonth = (date) => {
        return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
    };

    const goToPreviousMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
    };

    const goToNextMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));
    };

    const renderCalendar = () => {
        const daysInMonth = getDaysInMonth(currentDate);
        const firstDay = getFirstDayOfMonth(currentDate);
        const days = [];
        const weekDays = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

        // Add weekday headers
        const weekDayHeaders = weekDays.map((day) => (
            <div key={day} className={styles.weekDay}>
                {day}
            </div>
        ));

        // Add empty cells for days before the first day of the month
        for (let i = 0; i < firstDay; i++) {
            days.push(
                <div key={`empty-${i}`} className={styles.emptyDay} />
            );
        }

        // Add days of the month
        for (let day = 1; day <= daysInMonth; day++) {
            const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
            const dateString = date.toISOString().split('T')[0];
            const status = attendanceData[dateString] || 'default';

            days.push(
                <div
                    key={day}
                    className={`${styles.calendarDay} ${getStatusColor(status)}`}
                >
                    {day}
                </div>
            );
        }

        return [...weekDayHeaders, ...days];
    };

    return (
        <div className={styles.calendarContainer}>
            <div className={styles.calendarHeader}>
                <div className={styles.navigationWrapper}>
                    <button
                        onClick={goToPreviousMonth}
                        className={styles.navButton}
                    >
                        <ChevronLeft className={styles.navIcon} />
                    </button>
                    <h2 className={styles.monthTitle}>
                        {currentDate.toLocaleString('default', { month: 'long', year: 'numeric' })}
                    </h2>
                    <button
                        onClick={goToNextMonth}
                        className={styles.navButton}
                    >
                        <ChevronRight className={styles.navIcon} />
                    </button>
                </div>
                <button className={styles.moreButton}>
                    <MoreVertical className={styles.moreIcon} />
                </button>
            </div>

            <div className={styles.calendarGrid}>
                {renderCalendar()}
            </div>

            <div className={styles.legend}>
                <div className={styles.legendItem}>
                    <div className={`${styles.legendDot} ${styles.presentDot}`}></div>
                    <span>Present</span>
                </div>
                <div className={styles.legendItem}>
                    <div className={`${styles.legendDot} ${styles.absentDot}`}></div>
                    <span>Absent</span>
                </div>
                <div className={styles.legendItem}>
                    <div className={`${styles.legendDot} ${styles.holidayDot}`}></div>
                    <span>Holiday</span>
                </div>
                <div className={styles.legendItem}>
                    <div className={`${styles.legendDot} ${styles.leaveDot}`}></div>
                    <span>Leave</span>
                </div>
            </div>
        </div>
    );
};

export default AttendanceCalendar;