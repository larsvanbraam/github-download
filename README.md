# git-download
Download a GitHub repo instead of cloning it.

![Demo](http://larsvanbraam.nl/git-download-demo.gif)

## Installation
```bash
$ npm i -g https://github.com/larsvanbraam/github-download.git
```

## Usage
Run the following in the folder where you want the download to happen and follow the steps.
```bash
$ git download
```

## Locations 

#### Custom repositories
Custom repositories are stored in the user profile folder in a file called `.gitDownloadRepositories`

Platform | Location
--- | ---
OS X | `~/.gitDownloadRepositories`

#### GitHub token location

Platform | Location
--- | ---
OS X | `~/Library/Application Support/git-download/config.json`
Linux (XDG) | `$XDG_CONFIG_HOME/git-download/config.json`
Linux (Legacy) | `~/.config/git-download/config.json`
Windows (> Vista) | `%LOCALAPPDATA%/git-download/config.json`
Windows (XP, 2000) | `%USERPROFILE%/Local Settings/Application Data/git-download/config.json`

If you want to remove the token, remove the folder + [remove the personal token on GitHub](https://github.com/settings/tokens), to be prompted for a new login.
