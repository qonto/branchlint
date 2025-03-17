import { sprintf } from 'sprintf-js';
import chalk from 'chalk';
import type { Options, ValidationType } from './types';

export function log(body: string) {
  // eslint-disable-next-line no-console
  console.log(body);
}

function getPrefixErrorMessage(config: Options, branchName: string) {
  return sprintf(
    config.msgPrefixNotAllowed,
    branchName,
    config.prefixes,
    config.separator,
  );
}

function getDisallowedErrorMessage(config: Options, branchName: string) {
  return sprintf(config.msgBranchDisallowed, branchName);
}

function getRegexErrorMessage(config: Options, branchName: string) {
  return sprintf(
    config.msgRegexNotMatched,
    branchName,
    config.regularExpressions,
  );
}

function getSeparatorErrorMessage(config: Options, branchName: string) {
  return sprintf(config.msgSeperatorRequired, branchName, config.separator);
}

function getSectionsErrorMessage(config: Options, branchName: string) {
  return sprintf(config.msgSectionsOver, branchName, config.maxSections);
}

// eslint-disable-next-line max-lines-per-function
export function printErrorMessage(
  config: Options,
  type: ValidationType,
  branchName: string,
) {
  switch (type) {
    case 'prefix':
      return log(
        chalk.red('prefix: ') + getPrefixErrorMessage(config, branchName),
      );

    case 'disallowed':
      return log(
        chalk.red('name: ') + getDisallowedErrorMessage(config, branchName),
      );

    case 'regex':
      return log(
        chalk.red('regex: ') + getRegexErrorMessage(config, branchName),
      );

    case 'separator':
      return log(
        chalk.red('separator: ') + getSeparatorErrorMessage(config, branchName),
      );

    case 'sections':
      return log(
        chalk.red('sections: ') + getSectionsErrorMessage(config, branchName),
      );

    default:
      return '';
  }
}
