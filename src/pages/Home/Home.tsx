import { FC } from "react";
import { RouteComponentProps, Redirect } from "react-router-dom";

export type Props = RouteComponentProps;

const Home: FC<Props> = () => <Redirect to="/dashboard" />;

// Fetch server-side data here
export const loadData = () => [];

export default Home;
