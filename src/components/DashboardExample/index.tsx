import { memo } from "react";
import { DashboardLayout } from "..";
import styles from "./styles.module.scss";

const DashboardExample = () => (
  <DashboardLayout>
    <div className={styles.dashboard}>
      <div className={styles.header}>
        <h1>Patient Session Dashboard</h1>
        <p>
          Welcome back, Dr. Smith! Here&apos;s what&apos;s happening with your
          patients today.
        </p>
      </div>

      <div className={styles.statsGrid}>
        <div className={styles.statCard}>
          <h3>Today&apos;s Sessions</h3>
          <p className={styles.statNumber}>12</p>
          <p className={styles.statLabel}>+2 from yesterday</p>
        </div>

        <div className={styles.statCard}>
          <h3>Active Patients</h3>
          <p className={styles.statNumber}>48</p>
          <p className={styles.statLabel}>3 new this week</p>
        </div>

        <div className={styles.statCard}>
          <h3>Pending Reviews</h3>
          <p className={styles.statNumber}>6</p>
          <p className={styles.statLabel}>2 urgent</p>
        </div>

        <div className={styles.statCard}>
          <h3>Completion Rate</h3>
          <p className={styles.statNumber}>94%</p>
          <p className={styles.statLabel}>+5% this month</p>
        </div>
      </div>

      <div className={styles.content}>
        <div className={styles.recentSessions}>
          <h2>Recent Sessions</h2>
          <div className={styles.sessionsList}>
            <div className={styles.sessionItem}>
              <div className={styles.sessionInfo}>
                <h4>John Doe</h4>
                <p>Physical Therapy - Lower Back</p>
              </div>
              <div className={styles.sessionStatus}>
                <span className={styles.statusCompleted}>Completed</span>
                <span className={styles.sessionTime}>2:30 PM</span>
              </div>
            </div>

            <div className={styles.sessionItem}>
              <div className={styles.sessionInfo}>
                <h4>Jane Smith</h4>
                <p>Cognitive Therapy - Memory</p>
              </div>
              <div className={styles.sessionStatus}>
                <span className={styles.statusInProgress}>In Progress</span>
                <span className={styles.sessionTime}>3:00 PM</span>
              </div>
            </div>

            <div className={styles.sessionItem}>
              <div className={styles.sessionInfo}>
                <h4>Mike Johnson</h4>
                <p>Speech Therapy - Articulation</p>
              </div>
              <div className={styles.sessionStatus}>
                <span className={styles.statusScheduled}>Scheduled</span>
                <span className={styles.sessionTime}>4:00 PM</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </DashboardLayout>
);

export default memo(DashboardExample);
