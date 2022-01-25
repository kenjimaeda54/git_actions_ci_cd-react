module.exports = {
  branches: 'master',
  repositoryUrl: 'https://github.com/kenjimaeda54/git_actions_ci_cd-react',
  plugins: [
    '@semantic-release/commit-analyzer',
    '@semantic-release/release-notes-generator',
    '@semantic-release/git',
  ],
};
