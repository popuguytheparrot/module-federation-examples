const path = require("path");
const {merge} = require("webpack-merge");
const ModuleFederationPlugin = require("webpack").container
  .ModuleFederationPlugin;
const { client: clientLoaders } = require("./loaders");
const plugins = require("./plugins");
const common = require("./common.base");
const deps = require('../../package.json').dependencies
module.exports = merge(common, {
  name: "client",
  target: "web",
  entry: ["@babel/polyfill", path.resolve(__dirname, "../../src/index.ts")],
  output: {
    publicPath: "http://localhost:3001/static/",
  },
  module: {
    rules: clientLoaders,
  },
  plugins: [
    ...plugins.client,
    new ModuleFederationPlugin({
      name: "website1",
      filename: "container.js",
      remotes: {
        website2: "website2@http://localhost:3002/static/container.js",
      },
      shared: [{"react":deps.react, "react-dom":deps["react-dom"]}],
    }),
  ],
});
