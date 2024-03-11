module.exports = {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  transform: {
    '^.+\\.(js|jsx|ts|tsx|mjs)$': 'babel-jest',
  },
  transformIgnorePatterns: ['node_modules/(?!easy-addins-utils)/'],
  modulePaths: ["<rootdir>/src"],
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  collectCoverage: true,
  coverageDirectory: "coverage",
};