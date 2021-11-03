import * as React from "react"
import { Link } from "gatsby"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import Seo from "../components/seo"

const IndexPage = ({ data }) => (
  <Layout>
    <Seo title="Home" />
    <h1>設計書</h1>
    <p>
      <Link to="/flows/">状態遷移図</Link> <br />
      <Link to="/commands/">コマンド一覧</Link> <br />
      <Link to="/using-ssr">Go to "Using SSR"</Link> <br />
      <Link to="/using-dsg">Go to "Using DSG"</Link>
      <h4>{data.allMarkdownRemark.totalCount} Posts</h4>
      {data.allMarkdownRemark.edges.map(({ node }) => (
        <div key={node.id}>
          <Link to={`/${node.frontmatter.path}/`}>
            {node.frontmatter.title}
          </Link>
          <p>{node.excerpt}</p>
        </div>
      ))}
    </p>
  </Layout>
)

export default IndexPage

export const query = graphql`
  query {
    allMarkdownRemark {
      totalCount
      edges {
        node {
          id
          frontmatter {
            title
            date(formatString: "DD MMMM, YYYY")
            path
          }
          excerpt
        }
      }
    }
  }
`
