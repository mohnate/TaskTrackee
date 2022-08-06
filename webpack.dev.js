const path = require("path");
const main = require("./webpack.config");
const { merge } = require("webpack-merge");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");

module.exports = merge(main, {
  mode: "development",
  // Where files should be sent once they are bundled
  output: {
    path: path.join(__dirname, "/dist"),
    filename: "[name].js",
    chunkFilename: "[name].chunk.js",
    pathinfo: true,
    publicPath: "/",
  },
  // webpack 5 comes with devServer which loads in development mode
  devServer: {
    port: 3000,
    static: true,
    open: false,
    hot: true,
    compress: true,
    historyApiFallback: true,
    client: {
      overlay: false,
      logging: "warn", // Want to set this to 'warn' or 'error'
    },
  },
  module: {
    rules: [
      {
        test: /\.(s[ac]ss|css)$/i,
        use: [
          "style-loader", // go last (4)
          {
            loader: "css-loader",
            options: {
              importLoaders: 1,
              modules: {
                auto: true,
                localIdentName: "[path][name]__[local]",
                localIdentHashDigest: "base64",
              },
            },
          }, //then this (3)
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                plugins: ["autoprefixer", "postcss-preset-env"],
              },
            },
          }, //then this (2)
          "sass-loader", // first this (1)
        ],
        include: /\.module\.css$/,
      },
      {
        test: /\.(s[ac]ss|css)$/i,
        use: [
          "style-loader", // go last (4)
          "css-loader", //then this (3)
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                plugins: ["autoprefixer", "postcss-preset-env"],
              },
            },
          }, // first this (2)
          "sass-loader", // first this (1)
        ],
        exclude: /\.module\.css$/,
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            plugins: [require.resolve("react-refresh/babel")].filter(Boolean),
          },
        },
      },
    ],
  },
  devtool: "eval-source-map",
  plugins: [
    new HtmlWebpackPlugin({ inject: true, template: "./public/index.html" }),
    new ReactRefreshWebpackPlugin(),
  ].filter(Boolean),
  resolve: {
    extensions: [".jsx", ".js"],
  },
  performance: {
    hints: false,
  },
});
