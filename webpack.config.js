const webpack = require("webpack");
const path = require("path");
const Dotenv = require("dotenv-webpack");

module.exports = {
  entry: {
    index: "./src/index.js",
  },
  // Rules of how webpack will take our files, complie & bundle them for the browser
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env", "@babel/react"],
          },
        },
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: "asset/resource",
        generator: {
          filename: "images/[hash][ext][query]",
        },
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: "asset/resource",
        generator: {
          filename: "assets/[base]",
        },
      },
    ],
  },
  plugins: [
    new webpack.ProvidePlugin({
      React: "react",
    }),
    new Dotenv(),
  ],
  resolve: {
    alias: {
      $Public: path.resolve(__dirname, "public/"),
      $Icon: path.resolve(__dirname, "public/icon/"),
      $Lib: path.resolve(__dirname, "src/lib/"),
      $Routes: path.resolve(__dirname, "src/routes/"),
      $Styles: path.resolve(__dirname, "src/styles/"),
      $Components: path.resolve(__dirname, "src/components/"),
    },
  },
  target: "web",
};
