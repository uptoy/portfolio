const path = require('path')

module.exports = {
  stories: ['../src/**/*.stories.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: ['@storybook/addon-links', '@storybook/addon-essentials', '@storybook/addon-interactions'],
  framework: '@storybook/react',
  core: {
    builder: '@storybook/builder-webpack5'
  },
  staticDirs: ['../public'],
  webpackFinal: async (config) => {
    return {
      ...config,
      resolve: {
        ...config.resolve,
        alias: {
          ...config.resolve.alias,
          '@/components': path.resolve(__dirname, '../src/components'),
          '@/lib': path.resolve(__dirname, '../src/lib'),
          '@/models': path.resolve(__dirname, '../src/models'),
          '@/pages': path.resolve(__dirname, '../src/pages'),
          '@/styles': path.resolve(__dirname, '../src/styles')
        }
      }
    }
  }
}
