module.exports = function (api) {
  const plugins = ["@babel/plugin-transform-runtime"];

  if (api.env("production") === "development") {
    plugins.push("react-refresh/babel");
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

// babel.config.json
// {
//   "presets": [
//     [
//       "@babel/preset-env",
//       {
//         "useBuiltIns": "entry",
//         "corejs": "3.24",
//         "targets": "> 0.25%, not dead"
//       }
//     ],
//     [
//       "@babel/react",
//       {
//         "runtime": "automatic"
//       }
//     ]
//   ],
//   // "plugins": ["@babel/transform-runtime"]
//   "plugins": ["@babel/plugin-transform-runtime", "react-refresh/babel"]
//   // npm run test will break due to react-refresh/babel, I haven't
//   // found a viable solution that doesn't need me to change plugins
//   // whenever testing have to be run
// }
