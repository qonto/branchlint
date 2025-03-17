import { log, printErrorMessage } from './util';
import type { Options, Validation } from './types';
import type { Config } from './config';

export class Linter {
  options: Options;

  constructor(config: Config) {
    this.options = config.options;
  }

  // eslint-disable-next-line max-lines-per-function
  lint(branchName: string) {
    if (this.isAllowed(branchName)) {
      return true;
    }

    const validations: Validation[] = [
      { type: 'prefix', isValid: this.validatePrefix(branchName) },
      { type: 'disallowed', isValid: this.validateDisallowedName(branchName) },
      { type: 'regex', isValid: this.validateRegex(branchName) },
      { type: 'separator', isValid: this.validateSeparator(branchName) },
      { type: 'sections', isValid: this.validateSections(branchName) },
    ];

    this.printErrors(validations, branchName);

    const somethingError = validations.some((validation) => {
      return !validation.isValid;
    });

    if (somethingError) {
      process.exitCode = 1;
      return false;
    }

    return true;
  }

  isAllowed(branchName: string) {
    if (this.options.allowed.includes(branchName)) {
      log('valid branch name');
      return true;
    }

    return false;
  }

  printErrors(validations: Validation[], branchName: string) {
    if (!this.options.quiet) {
      validations.forEach((validation) => {
        if (!validation.isValid) {
          printErrorMessage(this.options, validation.type, branchName);
        }
      });
    }
  }

  validatePrefix(branchName: string) {
    const { prefixes, separator } = this.options;

    if (prefixes.length === 0) {
      return true;
    }

    return prefixes.some((prefix) => {
      const regex = new RegExp(`^${prefix}${separator}`);
      return branchName.match(regex);
    });
  }

  validateDisallowedName(branchName: string) {
    const { disallowed } = this.options;

    if (disallowed.length === 0) {
      return true;
    }

    return !disallowed.some((name) => {
      const regex = new RegExp(`^${name}$`);
      return branchName.match(regex);
    });
  }

  validateRegex(branchName: string) {
    const { regularExpressions } = this.options;

    if (regularExpressions.length === 0) {
      return true;
    }

    return regularExpressions.some((regularExpression) => {
      const regex = new RegExp(regularExpression);
      return branchName.match(regex);
    });
  }

  validateSeparator(branchName: string) {
    const { separator } = this.options;
    if (!separator || separator === '') {
      return true;
    }

    const regex = new RegExp(`^.*${separator}.*`);
    return regex.test(branchName);
  }

  validateSections(branchName: string) {
    const { separator, maxSections } = this.options;
    const splited = branchName.split(separator);

    if (!separator || !maxSections) {
      return true;
    }

    return splited.length <= maxSections;
  }
}
