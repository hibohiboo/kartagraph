import { StorybookConfig, CoreConfig, Options } from '@storybook/core-common'
import { UserConfig } from 'vite'
import { Weaken } from 'utilitypes'

interface CustomizedCoreConfig extends Weaken<CoreConfig, 'builder'> {
  builder: CoreConfig['builder'] | 'storybook-builder-vite'
}
interface CustomizedStorybookConfig extends Weaken<StorybookConfig, 'core'> {
  core: CustomizedCoreConfig
  stories: string[]
  addons: string[]
  viteFinal?: (config: UserConfig, options: Options) => UserConfig
}

const config: CustomizedStorybookConfig = {
  stories: [
    '../stories/**/*.stories.mdx',
    '../stories/**/*.stories.@(js|jsx|ts|tsx)',
  ],
  addons: ['@storybook/addon-links', '@storybook/addon-essentials'],
  core: {
    builder: 'storybook-builder-vite',
  },
  viteFinal(config, { configType }) {
    if (!config.resolve) return config
    // customize the Vite config here
    config.resolve.alias = [
      { find: '@', replacement: '/src' },
      { find: 'react-native', replacement: 'react-native-web' },
    ]
    config.root = 'client'
    config.plugins = [...config.plugins]
    // return the customized config
    return config
  },
}
export default config
