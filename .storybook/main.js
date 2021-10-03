module.exports = {
  "stories": [
    "../stories/**/*.stories.mdx",
    "../stories/**/*.stories.@(js|jsx|ts|tsx)"
  ],
  "addons": [
    "@storybook/addon-links",
    "@storybook/addon-essentials"
  ],
  "core": {
    "builder": "storybook-builder-vite"
  },
  async viteFinal(config, { configType }) {
    // customize the Vite config here
    config.resolve.alias = [
      { find: '@', replacement: '/src' },
      { find: 'react-native', replacement: 'react-native-web' },
    ]
    config.root = 'client'

    // return the customized config
    return config;
},
}