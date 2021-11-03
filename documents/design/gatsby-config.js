module.exports = {
  siteMetadata: {
    title: `カルタグラフ設計図`,
    description: `markdownをHTMLにしたいだけなのに`,
    author: `@hibohiboo`,
    siteUrl: `https://twitter.com/hibohiboo`,
  },

  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/contents/images`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/contents/posts`,
        name: `posts`,
      },
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        // Footnotes mode (default: true)
        footnotes: true,
        // Pedantic mode (default: true)
        gfm: true,
        // Plugins configs
        plugins: [
          `gatsby-remark-autolink-headers`,
          "gatsby-remark-mermaid",
        ],
      },
    },
  ],
}
