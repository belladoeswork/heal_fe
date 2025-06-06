import path from "path";
import webpack, {
  Configuration,
  WebpackPluginInstance,
  RuleSetUseItem,
} from "webpack";
import { WebpackManifestPlugin } from "webpack-manifest-plugin";
import TerserPlugin from "terser-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import ForkTsCheckerWebpackPlugin from "fork-ts-checker-webpack-plugin";
import LoadablePlugin from "@loadable/webpack-plugin";
import { BundleAnalyzerPlugin } from "webpack-bundle-analyzer";

export const isDev = process.env.NODE_ENV === "development";

const getStyleLoaders = (isWeb: boolean, isSass?: boolean) => {
  let loaders: RuleSetUseItem[] = [
    {
      loader: "css-loader",
      options: {
        importLoaders: isSass ? 2 : 1,
        modules: {
          auto: true,
          localIdentName: isDev ? "[path][name]__[local]" : "[hash:base64]",
          exportOnlyLocals: !isWeb,
          namedExport: false,
        },
      },
    },
    { loader: "postcss-loader" },
  ];

  if (isWeb) loaders = [MiniCssExtractPlugin.loader, ...loaders];

  if (isSass) loaders = [...loaders, { loader: "sass-loader" }];

  return loaders;
};

const getPlugins = (isWeb: boolean) => {
  let plugins = [
    new webpack.ProgressPlugin(),
    new WebpackManifestPlugin({
      fileName: path.resolve(process.cwd(), "public/webpack-assets.json"),
      filter: (file) => file.isInitial,
    }),
    new LoadablePlugin({
      writeToDisk: true,
      filename: "../loadable-stats.json",
    }),
    // Setting global variables
    new webpack.DefinePlugin({
      __CLIENT__: isWeb,
      __SERVER__: !isWeb,
      __DEV__: isDev,
    }),
  ];

  if (isDev)
    plugins = [
      ...plugins,
      // Runs TypeScript type checker on a separate process
      new ForkTsCheckerWebpackPlugin({
        typescript: {
          configFile: path.resolve(process.cwd(), "tsconfig.json"),
        },
        async: isDev,
        logger: "webpack-infrastructure",
      }),
    ];

  if (!isDev)
    plugins = [
      ...plugins,
      // Visualize size of webpack output files, see: https://github.com/webpack-contrib/webpack-bundle-analyzer
      new BundleAnalyzerPlugin({
        analyzerMode:
          process.env.NODE_ENV === "analyze" ? "server" : "disabled",
      }),
    ];

  return plugins;
};

const config = (isWeb = false): Configuration => ({
  mode: isDev ? "development" : "production",
  stats: "minimal",
  context: path.resolve(process.cwd()),
  output: { clean: true },
  watchOptions: isDev
    ? {
        ignored: "**/node_modules/**",
        aggregateTimeout: 300,
        poll: false,
      }
    : undefined,
  optimization: {
    minimizer: [
      new TerserPlugin({
        // See more options: https://github.com/webpack-contrib/terser-webpack-plugin#terseroptions
        terserOptions: { compress: { drop_console: true } },
      }),
    ],
  },
  plugins: getPlugins(isWeb) as WebpackPluginInstance[],
  module: {
    rules: [
      {
        test: /\.(t|j)sx?$/,
        exclude: /node_modules/,
        loader: "babel-loader",
        options: {
          caller: { target: isWeb ? "web" : "node" },
          cacheDirectory: isDev,
        },
      },
      {
        test: /\.css$/,
        use: getStyleLoaders(isWeb),
      },
      {
        test: /\.(scss|sass)$/,
        use: getStyleLoaders(isWeb, true),
      },
      {
        test: /\.(woff2?|eot|ttf|otf)$/i,
        type: "asset",
        generator: { emit: isWeb },
      },
      {
        test: /\.(png|svg|jpe?g|gif)$/i,
        type: "asset",
        generator: { emit: isWeb },
      },
    ],
  },
  resolve: {
    modules: ["src", "node_modules"],
    extensions: [".ts", ".tsx", ".js", ".jsx", ".json"],
  },
});

export default config;
