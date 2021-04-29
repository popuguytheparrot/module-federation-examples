const HtmlWebpackPlugin = require("html-webpack-plugin");
const ModuleFederationPlugin = require("webpack").container
  .ModuleFederationPlugin;
const path = require("path");

module.exports = {
  entry: "./src/index",
  mode: "development",
  devServer: {
    contentBase: path.join(__dirname, "dist"),
    port: 3001,
  },
  output: {
    publicPath: "auto",
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js"],
  },
  module: {
    rules: [
      {
        test: /bootstrap\.tsx$/,
        loader: "bundle-loader",
        options: {
          lazy: true,
        },
      },
      {
        test: /\.tsx?$/,
        loader: "babel-loader",
        exclude: /node_modules/,
        options: {
          presets: ["@babel/preset-react", "@babel/preset-typescript"],
          plugins: ["@babel/plugin-syntax-top-level-await"],
        },
      },
    ],
  },
  plugins: [
    new ModuleFederationPlugin({
      name: "CorpCRM",
      filename: "remoteEntry.js",
      exposes: {
        './useUserLogin': './src/hooks/useUserLogin',
      },
      remotes: {
        app2: 'app2@http://localhost:3002/remoteEntry.js',
      },
      shared: [{ react: { singleton: true }, 'react-dom': { singleton: true }}],
    }),
    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),
  ],
  experiments: {
    topLevelAwait: true
  }
};
