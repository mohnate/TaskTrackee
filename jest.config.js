module.exports = {
  verbose: true,
  setupFilesAfterEnv: ["<rootDir>/__mocks__/setupTests.js"],
  moduleFileExtensions: ["js", "jsx"],
  moduleNameMapper: {
    "\\.(css|scss)$": "<rootDir>/__mocks__/identity-obj-proxy-esm.js",
    // https://github.com/keyz/identity-obj-proxy/issues/8#issuecomment-430241345
  },
  transform: {
    "\\.(js|jsx)?$": "babel-jest",
    "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$":
      "<rootDir>/__mocks__/fileTransformer.js",
  },
  testEnvironment: "jsdom",
  testMatch: ["**/src/**/*.test.js"],
  testPathIgnorePatterns: ["/node_modules/", "/public/"],
  setupFiles: ["dotenv/config"],
};
