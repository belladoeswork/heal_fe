import { memo } from "react";
import styles from "./styles.module.scss";

interface UserProfile {
  name: string;
  role: string;
  avatar?: string;
}

interface Props {
  user?: UserProfile;
  onMenuToggle?: () => void;
}

const defaultUser: UserProfile = {
  name: "Dr. Smith",
  role: "DS",
};

const Navbar = ({ user, onMenuToggle }: Props) => (
  <nav className={styles.navbar}>
    <div className={styles.navbarContainer}>
      {/* Centered Page Title */}
      <div className={styles.pageTitle}>
        <h1>Patient Session Dashboard</h1>
      </div>

      {/* User Profile Section */}
      <div className={styles.userSection}>
        <div className={styles.notifications}>
          <svg
            className={styles.notificationIcon}
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M13.73 21a2 2 0 0 1-3.46 0"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span className={styles.notificationBadge}>2</span>
        </div>

        <div className={styles.userProfile}>
          <div className={styles.userInfo}>
            <span className={styles.userName}>
              {(user || defaultUser).name}
            </span>
            <span className={styles.userRole}>
              {(user || defaultUser).role}
            </span>
          </div>
          <div className={styles.avatar}>
            {(user || defaultUser).avatar ? (
              <img
                src={(user || defaultUser).avatar}
                alt={(user || defaultUser).name}
              />
            ) : (
              <span className={styles.avatarInitials}>
                {(user || defaultUser).name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </span>
            )}
          </div>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          type="button"
          className={styles.mobileMenuToggle}
          onClick={onMenuToggle}
          aria-label="Toggle mobile menu"
        >
          <span />
          <span />
          <span />
        </button>
      </div>
    </div>
  </nav>
);

Navbar.defaultProps = {
  user: defaultUser,
  onMenuToggle: undefined,
};

export default memo(Navbar);
