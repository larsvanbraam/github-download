const config = require('../config');
const gh = require('parse-github-url');
const fetch = require('node-fetch');
const ghauth = require('ghauth');
const download = require('download-git-repo');
const chalk = require('chalk');

/**
 * Parse the github url so we can retrieve the desired information
 * @param url
 * @returns {{username, repository}}
 */
async function parseUrl(url) {
    return new Promise((resolve, reject) => {
        const { owner, name } = gh(url);

        if (!owner && !name) {
            reject(
                `Parse url: Unable to get the ${chalk.underline('username')} and ${chalk.underline(
                    'repository',
                )} from the url.`,
            );
        } else {
            resolve({
                username: owner,
                repository: name,
            });
        }
    });
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
        `https://api.github.com/repos/${username}/${repository}/branches`,
        {
            headers: {
                'Authorization': 'Bearer ' + token,
            }
        },
    )
        .then(res => res.json())
        .catch(error => Promise.reject(`Get Branches: ${error}`));
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
                clientId: config.ghauth.clientId,
                configName: config.ghauth.configName,
                note: config.ghauth.note,
            },
            function (error, authData) {
                if (error) reject(`GitHub Authentication: ${error.data.message}`);
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
        download(`${username}/${repository}#${branch}`, './', { clone: false }, error => {
            if (error) reject(`Download failed: ${error}`);
            resolve();
        });
    });
}

module.exports = { parseUrl, getBranches, getAccessToken, downloadRepository };
