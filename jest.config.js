module.exports = {
  transform: {
    "^.+\\.ts$": "ts-jest",
    "^.+\\.vue$": "vue-jest",
    "^.+\\.js$": "babel-jest",
  },
  moduleNameMapper: {
    "^@/(.*)$": ["<rootDir>/src/$1"],
  },
  testEnvironment: "jsdom",
};
