import React from 'react';
import { graphql } from 'gatsby';
import Seo from '../components/seo';
import Img from 'gatsby-image';

function IntroToCoding({ data }) {
    return (
        <>
            <Seo title="Intro to Coding" description="In this tutorial, we'll learn the fundamentals of web development and build our first website" />
            <div style={{ maxWidth: '850px' }} className="Page container">
                <h2 style={{ display: 'flex', alignItems: 'center' }}>{data.contentfulTutorial.title} <Img style={{ height: '4rem', width: '4rem', marginLeft: '1rem' }} className="rounded-circle img-fluid" sizes={data.contentfulTutorial.author.photo.sizes} /></h2>
                <p>
                    <small><strong>Last Updated: {data.contentfulTutorial.updatedAt}</strong></small>
                </p>
                <hr />
                <div dangerouslySetInnerHTML={{
                    __html: data.contentfulTutorial.body.childMarkdownRemark.html
                }} />
            </div>
        </>
    );
}

export default IntroToCoding;

export const query = graphql`
    query IntroToCoding {
        contentfulTutorial(title: {eq: "Intro To Coding"}) {
        body {
            childMarkdownRemark {
                html
            }
        }
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
        title
        updatedAt(formatString: "MM/DD/YYYY")
        }
    }  
`;