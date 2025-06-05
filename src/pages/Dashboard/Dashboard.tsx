import { FC, memo } from "react";
import { RouteComponentProps } from "react-router-dom";
import { Helmet } from "react-helmet";

import styles from "./styles.module.scss";

export type Props = RouteComponentProps;

const Dashboard: FC<Props> = (): JSX.Element => (
  <div className={styles.dashboard}>
    <Helmet title="Patient Session Dashboard - Healura" />
    <div className={styles.header}>
      <h1>Dashboard</h1>
      <p>and key metrics</p>
    </div>
    <div className={styles.content}>
      <div className={styles.card}>
        <div className={styles.metric}>
          <span className={styles.number}>8</span>
          <span className={styles.label}>Scheduled</span>
        </div>
      </div>
      <div className={styles.card}>
        <h3>ACTIVE PATIENTS</h3>
        <div className={styles.metric}>
          <span className={styles.number}>24</span>
          <span className={styles.label}>Total</span>
        </div>
      </div>
      <div className={styles.card}>
        <h3>SESSION COMPLETION</h3>
        <div className={styles.metric}>
          <span className={styles.number}>94%</span>
          <span className={styles.label}>This Week</span>
        </div>
      </div>
      <div className={styles.card}>
        <h3>UPCOMING</h3>
        <div className={styles.metric}>
          <span className={styles.number}>3</span>
          <span className={styles.label}>Next Hour</span>
        </div>
      </div>
    </div>
  </div>
);

export default memo(Dashboard);
