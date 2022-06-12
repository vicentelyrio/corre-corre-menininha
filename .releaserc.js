module.exports = {
  branches: [
    'master',
    'main',
    { name: 'beta', prerelease: true },
    { name: 'alpha', prerelease: true }
  ],
  plugins: [
    [
      '@semantic-release/commit-analyzer',
      {
        releaseRules: [
          { scope: 'no-release', release: false },
          { breaking: true, release: 'major' },
          { type: 'feat', release: 'minor' },
          { type: 'fix', release: 'patch' },
        ],
      },
    ],
    '@semantic-release/release-notes-generator',
    ['@semantic-release/changelog', { changelogFile: 'docs/CHANGELOG.md' }],
    ['@semantic-release/npm', { npmPublish: false }],
    ['@semantic-release/github', { assets: ['docs/CHANGELOG.md'] }]
  ],
}
