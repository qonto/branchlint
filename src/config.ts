import { cosmiconfigSync } from 'cosmiconfig';
import chalk from 'chalk';
import type { Args, Options } from './types';

const packageName = 'branchlint';

export class Config {
  options: Options;
  configFileOptions: Partial<Options> = {};
  defaultOptions: Options = {
    allowed: [],
    prefixes: [],
    disallowed: [],
    regularExpressions: [],
    separator: '',
    maxSections: null,
    msgPrefixNotAllowed:
      'Branch name "%s" is not allowed.\n' +
      'Allowed branch name prefix is %s and separator is "%s"',
    msgBranchDisallowed: 'Pushing to "%s" is not allowed, use github-flow.',
    msgRegexNotMatched:
      'Pushing to "%s" is not allowed, Allowed regex pattern is "%s"',
    msgSeperatorRequired: 'Branch "%s" must contain a seperator "%s".',
    msgSectionsOver: `Branch name "%s" is not allowed\n\
        Allowed max section length is %s`,
  };

  constructor(args: Args | null = null) {
    this.readFromConfigFile(args);

    this.options = {
      ...this.defaultOptions,
      ...this.configFileOptions,
      ...(args ?? {}),
    };
  }

  readFromConfigFile(args: Args | null) {
    try {
      const explorer = cosmiconfigSync(packageName);

      if (args?.config) {
        const searchedFor = explorer.load(args.config);
        this.configFileOptions = searchedFor?.config;
        return;
      }

      const searchedFor = explorer.search();
      if (searchedFor) {
        this.configFileOptions = searchedFor.config;
      }
    } catch (e) {
      console.log(chalk.red(`Config error: ${e}`));
      process.exit(1);
    }
  }
}
