import { FC } from "react";
import { RouteComponentProps } from "react-router-dom";
import { Helmet } from "react-helmet";
import styles from "./styles.module.scss";

export type Props = RouteComponentProps;

const Settings: FC<Props> = (): JSX.Element => (
  <div className={styles.settings}>
    <Helmet title="Settings - Healura" />
    <div className={styles.header}>
      <h1>Settings</h1>
      <p>Configure your application preferences</p>
    </div>
    <div className={styles.content}>
      <div className={styles.card}>
        <h3>Profile Settings</h3>
        <p>Update your personal information and preferences.</p>
      </div>
      <div className={styles.card}>
        <h3>Notification Settings</h3>
        <p>Manage your notification preferences and alerts.</p>
      </div>
      <div className={styles.card}>
        <h3>Security</h3>
        <p>Configure security settings and access controls.</p>
      </div>
    </div>
  </div>
);

export default Settings;
