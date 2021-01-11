module.exports = {
  repositories: [
    {
      name: 'vue-skeleton',
      value: 'https://github.com/hjeti/vue-skeleton',
    },
    {
      name: 'muban',
      value: 'https://github.com/mubanjs/muban-skeleton',
    },
    {
      name: 'muban (legacy)',
      value: 'https://github.com/mediamonks/muban',
    }
  ],
  ghauth: {
    clientId: 'f024846c60a6f8c2dabd',
    configName: 'git-download',
    note: 'git-download',
  },
  settings: {
    filename: '.gitDownloadRepositories',
    key: {
      repositories: 'repositories',
    },
  },
};
