import type { Config } from 'jest';

const config: Config = {
  projects: [
    {
      displayName: 'rtl',
      preset: 'ts-jest',
      testEnvironment: 'jsdom',
      roots: ['<rootDir>/src'],
      setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
      testMatch: ['**/__tests__/**/*.test.tsx'],
      moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json'],
      moduleNameMapper: {
        '\\.(css|less|scss|sass)$': 'identity-obj-proxy'
      }
    },
    {
      displayName: 'bdd-ui',
      preset: 'ts-jest',
      testEnvironment: 'node',
      roots: ['<rootDir>/tests', '<rootDir>/src'],
      setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
      testMatch: ['**/tests/steps/**/*.test.ts'],
      moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json']
    }
  ],
  collectCoverageFrom: [
    'src/**/*.{ts,tsx}',
    '!src/**/*.d.ts'
  ],
  coverageDirectory: 'reports/coverage',
  coverageReporters: ['text', 'lcov', 'html'],
  reporters: [
    'default',
    [
      'jest-junit',
      {
        outputDirectory: 'reports/junit',
        outputName: 'junit.xml'
      }
    ],
    [
      'jest-html-reporters',
      {
        publicPath: './reports/html',
        filename: 'report.html',
        pageTitle: 'BDD UI Automation Report',
        expand: true
      }
    ]
  ],
  clearMocks: true,
  restoreMocks: true,
  verbose: true,
  testTimeout: 90000,
  maxWorkers: 1
};

export default config;