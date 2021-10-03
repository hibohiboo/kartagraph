// jest.config.ts
import type { Config } from '@jest/types'
export default async (): Promise<Config.InitialOptions> => {
  return {
    preset: 'ts-jest',
    rootDir: './client',
    roots: ['<rootDir>/src', '<rootDir>/tests'],
    testMatch: ['**/*.test.ts', '**/*.test.tsx'],
    transform: {
      '^.+\\.tsx?$': 'ts-jest',
    },
    moduleNameMapper: {
      '^@/(.*)$': '<rootDir>/src/$1',
      '\\.(css|scss|svg)$': '<rootDir>/__mocks__/styleMock.js',
      // '^react(.*)$': '<rootDir>/../node_modules/react$1',
      '^react-native$': 'react-native-web',
    },
    testEnvironment: 'jsdom',
    setupFilesAfterEnv: ['<rootDir>/tests/setupTests.ts'],
  }
}
