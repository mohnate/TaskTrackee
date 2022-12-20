module.exports = {
  plugins: [
    require("postcss-preset-env"),
    require("autoprefixer"),
    require("postcss-assets")({
      loadPaths: [
        "public",
        "public/font",
        "public/icon",
        "public/icon/nav",
        "public/logo",
      ],
    }),
  ],
};
