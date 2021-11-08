import React from 'react';
import { graphql } from 'gatsby';
import SEO from '../components/seo';
import Img from 'gatsby-image'; 

function Portfolio({ data }) {
    return (
        <>
            <SEO title="My Portfolio" description="I am a self-motivated, hard-working, full-stack developer and educator with a strong passion for innovation and technology." />
            <div style={{maxWidth: '850px'}} className="Page container">
                <h2 style={{display: 'flex', alignItems: 'center'}}>{data.contentfulPortfolio.title} <Img style={{ height: '4rem', width: '4rem', marginLeft: '1rem' }} className="rounded-circle img-fluid" sizes={data.contentfulPortfolio.author.photo.sizes} /></h2>
                <div dangerouslySetInnerHTML={{
                    __html: data.contentfulPortfolio.description.childMarkdownRemark.html
                  }} />
                <p>
                    <small><strong>Last Updated: {data.contentfulPortfolio.updatedAt}</strong></small>
                </p>
                <hr />
                <div dangerouslySetInnerHTML={{
                    __html: data.contentfulPortfolio.body.childMarkdownRemark.html
                }} />
            </div>
        </>
    );
}

export default Portfolio;

export const query = graphql`
query Portfolio {
    contentfulPortfolio(title: {eq: "My Portfolio"}) {
      title
      author {
        name
        photo {
          sizes {
            aspectRatio
            base64
            sizes
            src
            srcSet
            srcSetWebp
            srcWebp
          }
        }
      }
      description {
        childMarkdownRemark {
          html
        }
      }
      body {
        childMarkdownRemark {
          html
        }
      }
      updatedAt(formatString: "MM/DD/YYYY")
    }
  }
`;