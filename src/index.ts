import * as fs from 'fs';
import * as path from 'path';
import * as inquirer from 'inquirer';
import * as shell from 'shelljs';

// ----------------------------------

type TCLIOptions = {
  readonly targetPath: string;
  readonly cmdPath: string;
};

type TAnswers = {
  readonly year: string;
  readonly day: string;
};

// ----------------------------------

const YEAR_CHOICES = fs.readdirSync(path.join(__dirname, 'years'));
const DAY_CHOICES = (year: string): string[] =>
  fs.readdirSync(path.join(__dirname, `years/${year}/days`));

const QUESTIONS = [
  {
    name: 'year',
    type: 'list',
    message: 'What project template would you like to generate?',
    choices: YEAR_CHOICES,
  },
  {
    name: 'day',
    type: 'list',
    message: 'Project name:',
    choices: (answers: TAnswers) => DAY_CHOICES(answers.year),
  },
];

// ----------------------------------

const postProcess = (options: TCLIOptions): boolean => {
  const isNode = fs.existsSync(
    path.join(options.targetPath, 'package-lock.json'),
  );

  if (isNode) {
    shell.cd(options.targetPath);

    // const result = shell.exec('yarn install');
    const result = shell.exec(`ts-node ${options.cmdPath}`);
    if (result.code !== 0) {
      return false;
    }
  }

  return true;
};

inquirer.prompt<TAnswers>(QUESTIONS).then((answers: TAnswers) => {
  const yearChoice = answers.year;
  const dayChoice = answers.day;
  const targetPath = path.join(__dirname, '../');
  const cmdPath = path.join('src/years', yearChoice, 'days', dayChoice);

  const options: TCLIOptions = {
    targetPath,
    cmdPath,
  };

  postProcess(options);
});
