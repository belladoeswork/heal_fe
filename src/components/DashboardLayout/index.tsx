import { memo, ReactNode } from "react";
import { Navbar } from "..";
import styles from "./styles.module.scss";

interface Props {
  children: ReactNode;
}

const DashboardLayout = ({ children }: Props) => (
  <div className={styles.dashboardLayout}>
    <Navbar />
    <main className={styles.mainContent}>{children}</main>
  </div>
);

export default memo(DashboardLayout);
