const rimraf = require('rimraf');
const StreamZip = require('node-stream-zip');
const fs = require('fs');
const mv = require('mv');
const glob = require('glob');
const gitUtil = require('./git-util');

/**
 * Delete a file/folder
 *
 * @param file
 * @returns {Promise<*>}
 */
async function deleteFile(file) {
  return new Promise((resolve, reject) => {
    rimraf(file, error => {
      if (error) reject(`Delete file: ${error}`);
      resolve();
    });
  });
}

/**
 * Extract the zip for the branch
 *
 * @param branch
 * @param repository
 * @returns {Promise<*>}
 */
async function extractBranchZip(repository, branch) {
  return new Promise((resolve, reject) => {
    // Create the output directory
    fs.mkdir(repository, error => {
      if (error) {
        reject(`Extract zip: ${error}`);
      } else {
        const zip = new StreamZip({
          file: gitUtil.branchToZipName(branch),
          storeEntries: true,
        });

        zip.on('ready', () => {
          // Extract the zip file
          zip.extract(
            `${repository}-${branch.replace(/\//g, '-')}/`,
            `./${repository}`,
            async error => {
              if (error) reject(`Extract zip: ${error}`);
              zip.close();
              resolve();
            },
          );
        });
      }
    });
  });
}

/**
 * Move files to a new destination
 *
 * @param source
 * @param destination
 * @returns {Promise<*>}
 */
async function moveFiles(source, destination) {
  return new Promise((resolve, reject) => {
    glob(`${source}/**/*.*`, { dot: true }, (error, files) => {
      if (error) reject(`Move files: ${error}`);
      let count = 0;
      files.forEach(file => {
        mv(file, file.replace(source, destination), { mkdirp: true }, error => {
          if (error) reject(`Move files: ${error}`);
          count += 1;
          if (count >= files.length - 1) resolve();
        });
      });
    });
  });
}

module.exports = { deleteFile, extractBranchZip, moveFiles };
