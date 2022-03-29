import React from 'react';
import { graphql } from 'gatsby';
import SEO from '../src/components/seo';
import Img from 'gatsby-image';

function Hello({ data }) {
    return (
        <>
            <SEO title="Hello" description="I am a self-motivated, hard-working, full-stack developer and educator with a strong passion for innovation and technology." />
            <div style={{ maxWidth: '850px' }} className="Page container">
                <div className="video-wrapper mt-5">
                    <iframe width="560" height="315" src="https://www.youtube.com/embed/N8BhbtIa0as" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                </div>
                <h2 style={{ display: 'flex', alignItems: 'center' }}>{data.contentfulResume.title} <Img style={{ height: '4rem', width: '4rem', marginLeft: '1rem' }} className="rounded-circle img-fluid" sizes={data.contentfulResume.author.photo.sizes} /></h2>
                <p>
                    <small><strong>Last Updated: {data.contentfulResume.updatedAt}</strong></small>
                </p>
                <p>
                    <small><strong>You can also download a copy <a href={`https:${data.contentfulResume.resumePdf.file.url}`} download>here</a></strong></small>
                </p>
                <hr />
                <div dangerouslySetInnerHTML={{
                    __html: data.contentfulResume.body.childMarkdownRemark.html
                }} />
            </div>
        </>
    );
}

export default Hello;

export const query = graphql`
    query Hello {
        contentfulResume(title: {eq: "My Resume"}) {
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
        resumePdf {
            file {
            url
            }
        }
        updatedAt(formatString: "MM/DD/YYYY")
        }
    }  
`;