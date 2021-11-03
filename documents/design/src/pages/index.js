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
      <h4>{data.allMarkdownRemark.totalCount} Posts</h4>
      <ul>
        {data.allMarkdownRemark.edges.map(({ node }) => (
          <div key={node.id}>
            <Link to={`/${node.frontmatter.path}/`}>
              {node.frontmatter.title}
            </Link>
          </div>
        ))}
      </ul>
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
