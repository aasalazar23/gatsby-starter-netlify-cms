import React from "react";
import PropTypes from "prop-types";
import { graphql } from "gatsby";
import { Redirect } from "@reach/router";
import { IndexPageTemplate } from "./template_exports/index-page-template";
import Layout from "../components/Layout";

import "./styles/IndexPage.scss";

const IndexPage = ({ data }) => {
  const { frontmatter } = data.markdownRemark;

  return (
    <Layout>
      {process.env.NODE_ENV === "production" ? (
        <Redirect noThrow to="/locations" />
      ) : (
        <IndexPageTemplate
          hero={frontmatter.hero}
          mainpitch={frontmatter.mainpitch}
          blogRoll={data.blogRoll}
          differentiators={frontmatter.differentiators}
        />
      )}
    </Layout>
  );
};

IndexPage.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.shape({
      frontmatter: PropTypes.object,
    }),
  }),
};

export default IndexPage;

export const pageQuery = graphql`
  query IndexPageTemplate {
    markdownRemark(frontmatter: { templateKey: { eq: "index-page" } }) {
      frontmatter {
        seo {
          seo_description
          title
        }
        hero {
          heading
          subheading
          buttons {
            fgColor
            textColor
            list {
              content
              title
            }
          }
        }
        mainpitch {
          title
          description
          buttons {
            fgColor
            textColor
            list {
              content
              title
            }
          }
        }
        differentiators {
          description
          title
          image {
            alt
            image {
              childImageSharp {
                fluid(maxHeight: 500, maxWidth: 500, quality: 100) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
        }
      }
    }
    blogRoll: allMarkdownRemark(
      sort: { order: DESC, fields: [frontmatter___date] }
      filter: {
        frontmatter: {
          templateKey: { eq: "blog-post" }
          featuredPost: { eq: true }
        }
      }
    ) {
      edges {
        node {
          excerpt(pruneLength: 400)
          id
          fields {
            slug
          }
          frontmatter {
            tags
            title
            templateKey
            date(formatString: "MMMM DD, YYYY")
            featuredPost
            featuredImage {
              alt
              image {
                childImageSharp {
                  fluid(maxWidth: 2048, quality: 100) {
                    ...GatsbyImageSharpFluid
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;
