module.exports = {
  testEnvironment: 'node',
  testMatch: ['**/*.test.ts'],
  moduleDirectories: ['node_modules', '<rootDir>/'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  collectCoverageFrom: ['src/**/*.{ts,js}', '!src/**/*.d.ts'],
  preset: 'ts-jest/presets/default',
  extensionsToTreatAsEsm: ['.ts'],
  globals: {
    'ts-jest': {
      useESM: true,
    },
  },
};
