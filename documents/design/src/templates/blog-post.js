import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
export default function BlogPost({ data }) {
  const post = data.markdownRemark
  
  return (
    <Layout>
      <div>
        <h1>{post.frontmatter.title}</h1>
        <div
            className="table-of-content"
            dangerouslySetInnerHTML={{ __html: post.tableOfContents }}
          />
        <div dangerouslySetInnerHTML={{ __html: post.html }} />
      </div>
    </Layout>
  )
}
export const query = graphql`
  query ($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      tableOfContents(
        absolute: false
        pathToSlugField: "frontmatter.path"
        maxDepth: 3
      )
      frontmatter {
        title
      }
    }
  }
`
