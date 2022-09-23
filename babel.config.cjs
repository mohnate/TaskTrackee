module.exports = function (api) {
  const plugins = ["@babel/plugin-transform-runtime"];
  console.log("Babel Mode", api.env());

  if (api.env("development")) {
    plugins.push("react-refresh/babel");
  }

  if (api.env("production")) {
    plugins.push(["react-remove-properties", { properties: ["data-testid"] }]);
  }

  api.cache(true);

  return {
    presets: [
      [
        "@babel/preset-env",
        {
          useBuiltIns: "entry",
          corejs: "3.24",
          targets: "> 0.25%, not dead",
        },
      ],
      [
        "@babel/react",
        {
          runtime: "automatic",
        },
      ],
    ],
    plugins,
  };
};
