const { getDefaultConfig } = require('metro-config');

module.exports = (async () => {
    const {
        resolver: { sourceExts, assetExts },
    } = await getDefaultConfig();
    return {
        transformer: {
            // Add support for `.js`, `.json`, `.ts`, `.tsx` extensions
            babelTransformerPath: require.resolve('react-native-svg-transformer'),
        },
        resolver: {
            sourceExts: [...sourceExts, 'cjs'], // Add support for `.cjs` extension if needed
        },
    };
})();
