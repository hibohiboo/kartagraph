const { resolve } = require('path')

module.exports = ({ config }) => {
  config.resolve.extensions.push('.ts', '.tsx')
  config.resolve.alias['@'] = resolve(__dirname, '../../../client/src')
  // storiesをtsxで書けるようにする
  config.module.rules.push({
    test: /\.(ts|tsx)$/,
    loader: require.resolve('babel-loader'),
    options: {
      presets: [require.resolve('babel-preset-react-app')],
    },
  })
  // 監視ポーリング設定(vagrant用)
  // config.watchOptions = {
  //   aggregateTimeout: 200,
  //   poll: 1000,
  //   ignored: /node_modules/,
  // }
  return config
}
