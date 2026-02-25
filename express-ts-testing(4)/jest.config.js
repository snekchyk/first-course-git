const { createDefaultPreset } = require("ts-jest");

const tsJestTransformCfg = createDefaultPreset().transform;

/** @type {import("jest").Config} **/
module.exports = {
  testEnvironment: "node",
  transform: {
    ...tsJestTransformCfg,
  },
  // Игнорируем скомпилированные файлы в dist
  modulePathIgnorePatterns: ["<rootDir>/dist/"],
  // Ищем тесты только с расширениями .ts или .js, исключая .d.ts
  testMatch: [
    "**/__tests__/**/*.[jt]s?(x)",
    "**/?(*.)+(spec|test).[jt]s?(x)"
  ],
};