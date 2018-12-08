const config = require('../config');
const gh = require('parse-github-url');
const fetch = require('node-fetch');
const ghauth = require('ghauth');
const wget = require('node-wget');

/**
 * Convert the branch name to the output zip file
 *
 * @param branch
 * @returns {string}
 */
function branchToZipName(branch) {
  return `./${branch.split('/').pop()}.zip`;
}

/**
 * Parse the github url so we can retrieve the desired information
 * @param url
 * @returns {{username, repository}}
 */
function parseUrl(url) {
  const { owner, name } = gh(url);

  return {
    username: owner,
    repository: name,
  };
}

/**
 * Get the branches for a repository
 *
 * @param repository
 * @param username
 * @param token
 * @returns {Promise<*>}
 */
async function getBranches(repository, username, token) {
  return fetch(
    `https://api.github.com/repos/${username}/${repository}/branches?access_token=${token}`,
  ).then(res => res.json());
}

/**
 * Login a user to retrieve an access token
 *
 * @returns {Promise<*>}
 */
async function getAccessToken() {
  return new Promise((resolve, reject) => {
    ghauth(
      {
        configName: config.ghauth.configName,
        note: config.ghauth.note,
      },
      function(error, authData) {
        if (error) reject(error);
        resolve(authData);
      },
    );
  });
}

/**
 * Download a zip of the repository
 * @param username
 * @param repository
 * @param branch
 * @returns {Promise<*>}
 */
async function downloadRepository(username, repository, branch) {
  return new Promise((resolve, reject) => {
    wget(
      {
        url: `https://github.com/${username}/${repository}/archive/${branch}.zip`,
        destination: `./`,
      },
      error => {
        error ? reject(error) : resolve();
      },
    );
  });
}

module.exports = { parseUrl, branchToZipName, getBranches, getAccessToken, downloadRepository };
