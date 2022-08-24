module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        extensions: [
          '.js',
          '.jsx',
          '.ts',
          '.tsx',
          '.android.js',
          '.android.tsx',
          '.ios.js',
          '.ios.tsx',
        ],
        alias: {
          '@shared': './src/shared',
          '@components': './src/components',
          '@utils': './src/utils',
          '@assets': './src/assets',
          '@screens': './src/screens',
        },
      },
    ],
  ],
};
