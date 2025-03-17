/** @type {import('ts-jest').JestConfigWithTsJest} **/
export default {
  preset: "ts-jest/presets/default-esm", // Use ESM preset
  testEnvironment: "node",
  extensionsToTreatAsEsm: [".ts"],
  moduleNameMapper: {
    "^(\\.{1,2}/.*)\\.js$": "$1", // Handle ESM imports
  },
  coverageDirectory: "coverage",
  collectCoverageFrom: [
    // unit testing
    "src/configs/setting.ts",
    "src/helpers/images/image_grouping.ts",
    "src/helpers/remotion/process_video_input_props.ts",
    // "src/service/*.ts",
    // // remotion unit testing
    // "src/remotion/utils/*.ts",
    // exclude
    "!src/**/*.type.ts",
    "!src/types/**/*.ts",
    "!**/node_modules/**",
  ],
  coverageReporters: ["text", "lcov", "html"],
  testMatch: ["**/__tests__/**/*.test.ts", "**/?(*.)+(spec|test).ts"],
  testPathIgnorePatterns: ["<rootDir>/__tests__/setup.ts"], // Exclude setup file
  setupFilesAfterEnv: ["<rootDir>/__tests__/setup.ts"],
  transform: {
    "^.+\\.tsx?$": [
      "ts-jest",
      {
        useESM: true,
      },
    ],
  },
  transformIgnorePatterns: [
    "node_modules/(?!(chalk|#ansi-styles|color-convert|color-name)/)",
  ],
};
