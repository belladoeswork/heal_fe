import { useLocation } from "react-router-dom";
import { RouteConfig, renderRoutes } from "react-router-config";
import { Helmet } from "react-helmet";

import { Sidebar, Navbar } from "../components";
import config from "../config";
// Import your global styles here
import "normalize.css/normalize.css";
import styles from "./styles.module.scss";

interface Route {
  route: { routes: RouteConfig[] };
}

const App = ({ route }: Route): JSX.Element => {
  const location = useLocation();

  // Don't show sidebar on home page
  const showSidebar = location.pathname !== "/";
  const isHome = location.pathname === "/";

  return (
    <div className={`${styles.App} ${isHome ? styles.home : ""}`}>
      <Helmet {...config.APP} />
      {showSidebar && <Sidebar />}
      {showSidebar && <Navbar />}
      <div
        className={`${styles.content} ${showSidebar ? styles.withSidebar : ""}`}
      >
        {/* Child routes won't render without this */}
        {renderRoutes(route.routes)}
      </div>
    </div>
  );
};

export default App;
