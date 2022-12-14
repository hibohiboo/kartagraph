import type { CloudFrontRequestHandler } from 'aws-lambda'

declare var DEFINE_DOMAIN: string
declare var DEFINE_SERVICE_NAME: string
declare var DEFINE_DESCRIPTION: string
declare var DEFINE_DEFAULT_OGP_IMAGE_URL: string

const DOMAIN = DEFINE_DOMAIN
const SERVICE_NAME = DEFINE_SERVICE_NAME
const DESCRIPTION = DEFINE_DESCRIPTION
const defaultBg = DEFINE_DEFAULT_OGP_IMAGE_URL

// OGP を返したい User-Agent をリストで定義しておく。
const bots = ['Twitterbot', 'facebookexternalhit', 'Slackbot-LinkExpanding']

const getHTML = (title: string, ogImage: string, url: string) => {
  return `
<!doctype html>
<html lang="ja" prefix="og: http://ogp.me/ns#">
<head prefix="og: http://ogp.me/ns#">
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${title}｜${SERVICE_NAME}</title>
  <meta name="description" content="${DESCRIPTION}" />
  <meta name="author" content="hibohiboo">
  <meta name="keywords" content="TRPG自己紹介テンプレート,TRPG初心者,僕の私のTRPG説明書" />
  <meta property="og:type" content="article" />
  <meta property="og:locale" content="ja_JP" />
  <meta property="og:site_name" content="${SERVICE_NAME}">
  <meta property="og:title" content="${title}｜${SERVICE_NAME}" />
  <meta property="og:description" content="${DESCRIPTION}" />
  <meta property="og:image" content="${ogImage}" />
  <meta property="og:url" content="https://${url}" />
  <meta name="twitter:card" content="summary" />
  <meta name="twitter:site" content="@hibohiboo" />
  <meta name="twitter:creator" content="@hibohiboo" />
</head>
<body></body>
</html>
`
}

export const handler: CloudFrontRequestHandler = async (event) => {
  const request = event.Records[0].cf.request
  const userAgent = request.headers['user-agent'][0].value
  const isBotAccess = bots.some((bot) => userAgent.includes(bot))
  if (!isBotAccess) {
    request.uri = '/friends-sold-separately/index.html'
    return request
  }

  // 拡張子を含んでいた場合、そのまま返す（.cssファイルなどを想定)
  if (request.uri.includes('.')) {
    return request
  }

  const url = defaultBg
  const title = 'ひぼのギャラリー'
  // Create OGP response
  const botResponse = {
    status: '200',
    headers: { 'content-type': [{ value: 'text/html;charset=UTF-8' }] },
    body: getHTML(title, url, DOMAIN + request.uri),
  }
  return botResponse
}
