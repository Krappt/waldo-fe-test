const aliases = (prefix = `src`) => ({
    '@pages': `${prefix}/pages`,
    '@components': `${prefix}/components`,
    '@queries': `${prefix}/queries`,
    '@utils': `${prefix}/utils`,
    '@theme': `${prefix}/assets/styles/theme.scss`,
    '@styles': `${prefix}/assets/styles`,
    '@images': `${prefix}/assets/images`,
});

module.exports = aliases;