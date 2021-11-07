import { StorybookConfig, CoreConfig, Options } from '@storybook/core-common'
import { Weaken } from 'utilitypes'
import { resolve } from 'path'
type WebpackConfig = any
interface CustomizedCoreConfig extends Weaken<CoreConfig, 'builder'> {
  builder: CoreConfig['builder'] | 'storybook-builder-vite'
}
interface CustomizedStorybookConfig extends Weaken<StorybookConfig, 'core'> {
  core: CustomizedCoreConfig
  stories: string[]
  addons: string[]
}

const config: CustomizedStorybookConfig = {
  stories: [
    '../../../client/stories/**/*.stories.mdx',
    '../../../client/stories/**/*.stories.@(js|jsx|ts|tsx)',
  ],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/preset-create-react-app',
  ],
  core: {
    builder: 'webpack5',
  },
  webpackFinal: async (config) => {
    // Without stats = false, building will generate an error at node_modules/@storybook/builder-webpack5/dist/cjs/index.js:181
    // TypeError: Cannot read property 'forEach' of undef
    config.stats = false
    // config.watchOptions = {
    //   aggregateTimeout: 200,
    //   poll: 1000,
    //   ignored: /node_modules/,
    // }
    return config
  },
}
export default config
