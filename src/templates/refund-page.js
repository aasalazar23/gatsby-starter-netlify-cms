import React from "react";
import PropTypes from "prop-types";
import Layout from "../components/Layout";
import Seo from "../components/seo";

import { RefundPageTemplate } from "./template_exports/refund-page-template";

import { graphql } from "gatsby";

const RefundPage = ({
  data: {
    file: { childMarkdownRemark, modifiedTime },
  },
}) => {
  const {
    frontmatter: { title, seo_description, pageBuilder },
  } = childMarkdownRemark;

  return (
    <Layout>
      <Seo title={title} description={seo_description} />
      <RefundPageTemplate
        title={title}
        lastUpdated={modifiedTime}
        pageBuilder={pageBuilder}
      />
    </Layout>
  );
};

RefundPage.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.shape({
      frontmatter: PropTypes.object,
    }),
  }),
};

export default RefundPage;

export const pageQuery = graphql`
  query RefundPageTemplate {
    file(
      childMarkdownRemark: {
        frontmatter: { templateKey: { eq: "refund-page" } }
      }
    ) {
      childMarkdownRemark {
        frontmatter {
          title
          seo_description
          pageBuilder {
            heading
            image {
              alt
              image {
                childImageSharp {
                  gatsbyImageData(
                    height: 500
                    width: 500
                    quality: 100
                    layout: CONSTRAINED
                  )
                }
              }
            }
            mdContent
            type
            list {
              content
              title
              mdContent
              fgColor
              bgColor
              textColor
              textAlign
            }
            textAlign
            textColor
            fgColor
            bgColor
          }
        }
      }
      modifiedTime(formatString: "MMMM Do, YYYY")
    }
  }
`;
