const path = require("path");
const main = require("./webpack.config");
const { merge } = require("webpack-merge");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");
const BundleAnalyzerPlugin =
  require("webpack-bundle-analyzer").BundleAnalyzerPlugin;

module.exports = (env) => {
  console.log("Mode:", process.env.NODE_ENV);

  return merge(main, {
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
        overlay: {
          errors: true,
          warnings: false,
        },
        reconnect: 3,
        progress: true,
        logging: "warn", // Want to set this to 'warn' or 'error'
      },
    },
    optimization: {
      runtimeChunk: "single",
      splitChunks: {
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: "vendors",
            chunks: "all",
          },
        },
      },
      emitOnErrors: true,
      mangleExports: false,
    },
    module: {
      rules: [
        // Capture scss module and css module file
        {
          test: /\.module\.(scss|css)$/i,
          use: [
            { loader: "style-loader", options: { injectType: "styleTag" } }, // fifth
            {
              loader: "css-loader",
              options: {
                importLoaders: 1,
                sourceMap: true,
                modules: {
                  auto: true,
                  localIdentName: "[path][name]__[local]",
                  localIdentHashDigest: "base64",
                },
              },
            }, // fourth
            {
              loader: "postcss-loader",
              options: {
                postcssOptions: {
                  plugins: ["autoprefixer", "postcss-preset-env"],
                },
              },
            }, // third
            "resolve-url-loader", // second
            "sass-loader", // first
          ],
        },
        // Capture scss and css file
        {
          test: /\.(scss|css)$/i,
          exclude: /\.module\.(scss|css)$/i,
          use: [
            { loader: "style-loader", options: { injectType: "styleTag" } }, // fifth
            "css-loader", // fourth
            {
              loader: "postcss-loader",
              options: {
                postcssOptions: {
                  plugins: ["autoprefixer", "postcss-preset-env"],
                },
              },
            }, // third
            "resolve-url-loader", // second
            "sass-loader", // first
          ],
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
      new ReactRefreshWebpackPlugin({ include: /\.(js|jsx)$/ }),
      new BundleAnalyzerPlugin({ logLevel: "silent", openAnalyzer: false }),
    ].filter(Boolean),
    resolve: {
      extensions: [".jsx", ".js"],
    },
    performance: {
      hints: false,
    },
  });
};
