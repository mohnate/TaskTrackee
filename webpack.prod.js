const path = require("path");
const main = require("./webpack.config");
const { merge } = require("webpack-merge");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CompressionPlugin = require("compression-webpack-plugin");
const BundleAnalyzerPlugin =
  require("webpack-bundle-analyzer").BundleAnalyzerPlugin;

module.exports = (env) => {
  console.log("Enable BundleAnalyzerPlugin:", env.ANALYZE);
  console.log("Mode:", process.env.NODE_ENV);

  return merge(main, {
    mode: "production",
    // Where files should be sent once they are bundled
    output: {
      path: path.join(__dirname, "/dist"),
      filename: "[name][contenthash].js",
      assetModuleFilename: "assets/[contenthash][ext][query]",
      pathinfo: false,
      clean: true,
      publicPath: "auto",
    },
    optimization: {
      emitOnErrors: true,
      minimize: true,
      removeAvailableModules: true,
      minimizer: [
        new TerserPlugin({
          terserOptions: {
            warnings: false,
            compress: {
              drop_console: true,
              pure_funcs: ["console.info", "console.error", "console.warn"],
            },
            parse: {},
            mangle: true,
            output: {
              comments: false,
              ascii_only: true,
            },
          },
        }),
      ],
      runtimeChunk: "single",
      splitChunks: {
        chunks: "all",
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: "vendor",
            chunks: "all",
            enforce: true,
          },
          styles: {
            test: /\.(css|scss)$/,
            enforce: true, // force css in new chunks (ignores all other options)
          },
        },
      },
    },
    module: {
      rules: [
        // Capture scss module and css module file
        {
          test: /\.module\.(scss|css)$/i,
          use: [
            MiniCssExtractPlugin.loader, // fourth
            {
              loader: "css-loader",
              options: {
                importLoaders: 1,
                sourceMap: true,
                modules: {
                  localIdentName: "[name]_[local]_[hash:base64:5]",
                  localIdentHashDigest: "base64",
                },
              },
            }, // third
            {
              loader: "postcss-loader",
              options: {
                postcssOptions: {
                  plugins: ["autoprefixer", "postcss-preset-env"],
                },
              },
            }, // second
            "sass-loader", // first
          ],
        },
        // Capture scss and css file
        {
          test: /\.(scss|css)$/i,
          exclude: /\.module\.(scss|css)$/i,
          use: [
            MiniCssExtractPlugin.loader, // fourth
            "css-loader", // third
            {
              loader: "postcss-loader",
              options: {
                postcssOptions: {
                  plugins: ["autoprefixer", "postcss-preset-env"],
                },
              },
            }, // second
            "sass-loader", // first
          ],
        },
      ],
    },
    plugins: [
      new MiniCssExtractPlugin({
        filename: "styles/[name].[contenthash].css",
      }),
      new CompressionPlugin(),
      new HtmlWebpackPlugin({
        template: "./public/index.html",
        favicon: "./public/favicon.ico",
        minify: {
          removeComments: true,
          collapseWhitespace: true,
          removeRedundantAttributes: true,
          useShortDoctype: true,
          removeEmptyAttributes: true,
          removeStyleLinkTypeAttributes: true,
          keepClosingSlash: true,
          minifyJS: true,
          minifyCSS: true,
          minifyURLs: true,
        },
      }),
      new BundleAnalyzerPlugin({
        analyzerMode: env.ANALYZE === "true" ? "server" : "disabled",
      }),
    ],
    performance: {
      hints: "warning",
    },
  });
};
