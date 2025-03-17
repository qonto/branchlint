import yargs from 'yargs';
import gitBranchIs from 'git-branch-is';
import { Config } from './config';
import { Linter } from './linter';

async function branchlint() {
  const argv = await yargs
    .usage('Usage: $0')
    .example('$0', 'Lint current branch')
    .help('h')
    .alias('h', 'help')
    .option('config', {
      alias: 'c',
      type: 'string',
      description: 'Config file path',
      default: null,
    }).argv;
  const config = new Config(argv);

  gitBranchIs.getBranch({}).then((branchName: string) => {
    const linter = new Linter(config);
    linter.lint(branchName);
  });
}

void branchlint();
