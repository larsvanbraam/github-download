const inquirer = require('inquirer');
const settings = require('user-settings').file('.gitDownloadRepositories');
const config = require('../config');

const CUSTOM = 'custom';

/**
 * Let the user confirm if he wants to overwrite the current path
 *
 * @param path
 * @returns {Promise<*>}
 */
async function confirmForce(path) {
  return inquirer.prompt([
    {
      type: 'confirm',
      name: 'force',
      message: `This directory is not empty, do you still want to continue?`,
      default: false,
    },
  ]);
}

async function chooseRepository() {
  return inquirer
    .prompt([
      {
        type: 'list',
        name: 'url',
        message: 'What repo would you like to checkout?',
        choices: [
          ...config.repositories,
          ...(settings.get(config.settings.key.repositories) || []),
          CUSTOM,
        ],
      },
      {
        when: response => response.url === CUSTOM,
        type: 'input',
        name: 'customUrl',
        message: 'GitHub clone url',
      },
      {
        when: response => response.url === CUSTOM,
        type: 'confirm',
        name: 'save',
        message: 'Would you like to save the custom url?',
      },
    ])
    .then(({ url, customUrl, save }) => {
      return {
        url: customUrl || url,
        save: save === true,
      };
    });
}

/**
 * Choose a branch that we want to download
 *
 * @param branches
 * @returns {Promise<*>}
 */
async function chooseBranch(branches) {
  return inquirer.prompt([
    {
      type: 'list',
      name: 'branch',
      message: 'Which branch do you want to download?',
      default: 'master',
      choices: branches.map(branch => branch.name),
    },
  ]);
}

module.exports = { chooseRepository, chooseBranch, confirmForce };
