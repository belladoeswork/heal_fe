import defaultConfig from "./default";
import prodConfig from "./prod";

// Use NODE_ENV instead of __DEV__ for better compatibility
const isDev = process.env.NODE_ENV === "development";

export default isDev ? defaultConfig : { ...defaultConfig, ...prodConfig };
