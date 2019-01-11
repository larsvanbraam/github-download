module.exports = {
  repositories: [
    {
      name: 'vue-skeleton',
      value: 'https://github.com/hjeti/vue-skeleton',
    },
    {
      name: 'muban',
      value: 'https://github.com/mediamonks/muban',
    },
    {
      name: 'react-skeleton',
      value: 'https://github.com/hjeti/react-skeleton',
    },
  ],
  ghauth: {
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
