export default {
  preset: "ts-jest/presets/default-esm",
  testEnvironment: "node",
  testMatch: ["**/**/*.test.ts"],
  globalSetup: "./tests/setups/globalSetup.ts",
  globalTeardown: "./tests/setups/globalTeardown.ts",
  setupFilesAfterEnv: ["./tests/setups/jest.setup.ts"],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
    "^(\\.{1,2}/.*)\\.js$": "$1",
  },
  testTimeout: 30_000,
  extensionsToTreatAsEsm: [".ts"],
  transform: {
    "^.+\\.tsx?$": [
      "ts-jest",
      {
        useESM: true,
        tsconfig: "tsconfig.json",
      },
    ],
  },
};
