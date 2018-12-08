const fs = require('fs');
const chalk = require('chalk');
const inquirerUtil = require('../util/inquirer-util');

/**
 * Check if a directory is empty, if it's not empty the user can still force it to continue.
 *
 * @param path
 * @returns {Promise<*>}
 */
async function isEmptyDirectory(path) {
  return new Promise((resolve, reject) => {
    fs.readdir(path, async function(err, files) {
      if (err) {
        reject(`Empty directory check: ${error}`);
      } else {
        if (!files.length) {
          resolve(true);
        } else {
          const { force } = await inquirerUtil.confirmForce(path);

          if (force) {
            resolve(true);
          } else {
            reject(
              `The directory where you want to download (${chalk.underline(path)}) is not empty!`,
            );
          }
        }
      }
    });
  });
}

module.exports = { isEmptyDirectory };
