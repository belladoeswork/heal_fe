import defaultConfig from "./default";
import prodConfig from "./prod";

// Handle environments where __DEV__ is not defined (like Vercel serverless)
const isDev =
  typeof __DEV__ !== "undefined"
    ? __DEV__
    : process.env.NODE_ENV === "development";

export default isDev ? defaultConfig : { ...defaultConfig, ...prodConfig };
