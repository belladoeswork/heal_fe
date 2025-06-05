import { FC } from "react";
import { RouteComponentProps } from "react-router-dom";
import { Helmet } from "react-helmet";
import styles from "./styles.module.scss";

export type Props = RouteComponentProps;

const Patients: FC<Props> = (): JSX.Element => (
  <div className={styles.patients}>
    <Helmet title="Patients - Healura" />
    <div className={styles.header}>
      <h1>Patients</h1>
      <p>Manage your patient records and information</p>
    </div>
    <div className={styles.content}>
      <div className={styles.card}>
        <h3>Patient List</h3>
        <p>View and manage all patients in your care.</p>
      </div>
      <div className={styles.card}>
        <h3>Add New Patient</h3>
        <p>Register a new patient to the system.</p>
      </div>
      <div className={styles.card}>
        <h3>Patient Analytics</h3>
        <p>View patient statistics and insights.</p>
      </div>
    </div>
  </div>
);

export default Patients;
