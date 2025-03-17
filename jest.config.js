const appRoot = require('app-root-path');

module.exports = {
  globals: {
    __basedir: appRoot.toString(),
  },
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: ['**/tests/**/?(*.)+(spec|test).[jt]s?(x)'],
};
