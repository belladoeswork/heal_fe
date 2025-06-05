import { RouteConfig } from "react-router-config";

import App from "../app";
import AsyncHome, { loadData as loadHomeData } from "../pages/Home";
import AsyncUserInfo, { loadData as loadUserInfoData } from "../pages/UserInfo";
import AsyncDashboard, {
  loadData as loadDashboardData,
} from "../pages/Dashboard";
import Patients from "../pages/Patients";
import SessionData from "../pages/SessionData";
import Calendar from "../pages/Calendar";
import Settings from "../pages/Settings";
import NotFound from "../pages/NotFound";

export default [
  {
    component: App,
    routes: [
      {
        path: "/",
        exact: true,
        component: AsyncHome, // Add your page here
        loadData: loadHomeData, // Add your pre-fetch method here
      },
      {
        path: "/UserInfo/:id",
        component: AsyncUserInfo,
        loadData: loadUserInfoData,
      },
      {
        path: "/dashboard",
        component: AsyncDashboard,
        loadData: loadDashboardData,
      },
      {
        path: "/patients",
        component: Patients,
      },
      {
        path: "/session-data",
        component: SessionData,
      },
      {
        path: "/calendar",
        component: Calendar,
      },
      {
        path: "/settings",
        component: Settings,
      },
      {
        component: NotFound,
      },
    ],
  },
] as RouteConfig[];
