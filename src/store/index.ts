import { createMemoryHistory, createBrowserHistory } from "history";
import { Action, configureStore } from "@reduxjs/toolkit";
import { ThunkAction } from "redux-thunk";
import { routerMiddleware } from "connected-react-router";

import createRootReducer from "./rootReducer";

interface Arg {
  initialState?: typeof window.__INITIAL_STATE__;
  url?: string;
}

// Use inferred return type for making correctly Redux types
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const createStore = ({ initialState, url }: Arg = {}) => {
  const history = __SERVER__
    ? createMemoryHistory({ initialEntries: [url || "/"] })
    : createBrowserHistory();
  const store = configureStore({
    preloadedState: initialState,
    reducer: createRootReducer(history),
    middleware: (getDefaultMiddleware) => [
      // Included default middlewares: https://redux-toolkit.js.org/api/getDefaultMiddleware#included-default-middleware
      ...getDefaultMiddleware(),
      routerMiddleware(history),
    ],
    devTools: process.env.NODE_ENV === "development",
  });

  return { store, history };
};

const { store } = createStore();

export type AppState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export type AppThunk = ThunkAction<void, AppState, unknown, Action<string>>;

export default createStore;
