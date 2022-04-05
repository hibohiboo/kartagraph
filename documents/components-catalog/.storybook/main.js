module.exports = {
  "typescript" : { reactDocgen: false }, // https://dev.classmethod.jp/articles/tried-to-add-storybook-to-nextjs-project/
  "stories": [
    "../stories/**/*.stories.mdx",
    "../stories/**/*.stories.@(js|jsx|ts|tsx)",
    '../stories/components/atoms/Loading.stories.tsx'
  ],
  "addons": [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions"
  ],
  "framework": "@storybook/react",
  "core": {
    "builder": "@storybook/builder-webpack5"
  }
}