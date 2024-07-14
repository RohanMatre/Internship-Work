const nextJest = require('next/jest');

// Use nextJest to load Next.js configuration and environment
const createJestConfig = nextJest({
  dir: './', // Path to your Next.js app
});

// Custom Jest configuration
const customJestConfig = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'], // Setup file for additional Jest configurations
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1', // Map @/* to <rootDir>/*
    '^@/app/(.*)$': '<rootDir>/app/$1', // Map @/app/* to <rootDir>/app/*
    '^@/src/app/(.*)$': '<rootDir>/src/app/$1', // Map @/app/* to <rootDir>/app/*
    '^@/src/components/(.*)$': '<rootDir>/src/components/$1', // Map @/components/* to <rootDir>/components/*
    '^@/src/slices/(.*)$': '<rootDir>/src/slices/$1', // Map @/slices/* to <rootDir>/slices/*
  },
  testEnvironment: 'jest-environment-jsdom', // Use jsdom for testing environment
};

// Export Jest configuration
module.exports = createJestConfig(customJestConfig);
