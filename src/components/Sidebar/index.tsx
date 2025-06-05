import { FC } from "react";
import { Link, useLocation } from "react-router-dom";
import styles from "./styles.module.scss";

const Sidebar: FC = () => {
  const location = useLocation();

  const navigationItems = [
    {
      path: "/patients",
      label: "Patients",
      icon: "👥",
    },
    {
      path: "/session-data",
      label: "Session Data",
      icon: "📊",
    },
    {
      path: "/calendar",
      label: "Calendar",
      icon: "📅",
    },
    {
      path: "/settings",
      label: "Settings",
      icon: "⚙️",
    },
  ];

  return (
    <div className={styles.sidebar}>
      <div className={styles.header}>
        <div className={styles.logo}>
          <img
            src="/heilu.png"
            alt="Healura Logo"
            className={styles.logoIcon}
          />
          <span className={styles.brandName}>Healura</span>
        </div>
      </div>

      <nav className={styles.navigation}>
        {navigationItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`${styles.navItem} ${
              location.pathname === item.path ? styles.active : ""
            }`}
          >
            <span className={styles.navIcon}>{item.icon}</span>
            <span className={styles.navLabel}>{item.label}</span>
          </Link>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;
