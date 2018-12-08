const config = require('../config');
const settings = require('user-settings').file(config.settings.filename);

function saveCustomRepository(repository) {
  // Get the current settings
  const repositories = settings.get(config.settings.key.repositories) || [];

  // Add the repository
  repositories.push(repository);

  // Update the settings
  settings.set(config.settings.key.repositories, repositories);
}

module.exports = { saveCustomRepository };
