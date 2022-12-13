require('dotenv').config()

require('esbuild')
  .build({
    entryPoints: ['src/handler/ogp/index.ts'],
    bundle: true,
    platform: 'node',
    outfile: 'dist/ogp/index.js',
    define: {
      DEFINE_DOMAIN: `'${process.env.ENV_DEFINE_DOMAIN}'`,
      DEFINE_SERVICE_NAME: `'${process.env.ENV_DEFINE_SERVICE_NAME}'`,
      DEFINE_DESCRIPTION: `'${process.env.ENV_DEFINE_DESCRIPTION}'`,
      DEFINE_DEFAULT_OGP_IMAGE_URL: `'${process.env.ENV_DEFINE_DEFAULT_OGP_IMAGE_URL}'`,
    },
    minify: false,
    sourcemap: false,
    target: ['node18'],
  })
  .catch(() => process.exit(1))
