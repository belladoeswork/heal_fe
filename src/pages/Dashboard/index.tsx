import loadable from "@loadable/component";

import { Loading, ErrorBoundary } from "../../components";
import { Props } from "./Dashboard";

const Dashboard = loadable(() => import("./Dashboard"), {
  fallback: <Loading />,
});

export default (props: Props): JSX.Element => (
  <ErrorBoundary>
    <Dashboard {...props} />
  </ErrorBoundary>
);

// No data loading needed for dashboard
export const loadData = () => [];
