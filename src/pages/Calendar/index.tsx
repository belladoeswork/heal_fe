import { FC } from "react";
import { RouteComponentProps } from "react-router-dom";
import { Helmet } from "react-helmet";
import styles from "./styles.module.scss";

export type Props = RouteComponentProps;

const Calendar: FC<Props> = (): JSX.Element => (
  <div className={styles.calendar}>
    <Helmet title="Calendar - Healura" />
    <div className={styles.header}>
      <h1>Calendar</h1>
      <p>Schedule and manage patient appointments</p>
    </div>
    <div className={styles.content}>
      <div className={styles.card}>
        <h3>Today&apos;s Appointments</h3>
        <p>View all appointments scheduled for today.</p>
      </div>
      <div className={styles.card}>
        <h3>Schedule New Appointment</h3>
        <p>Book a new session with a patient.</p>
      </div>
      <div className={styles.card}>
        <h3>Monthly View</h3>
        <p>See all appointments for the current month.</p>
      </div>
    </div>
  </div>
);

export default Calendar;
