import React from 'react';
import { graphql } from 'gatsby';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import Seo from '../components/seo';

function Resume({ data: { 
    contentfulResume: {
        updatedAt, 
        resumePdf, 
        author, 
        title, 
        body, 
    }} }) {
    const image = getImage(author.photo)
    return (
        <>
            <Seo title="My Resume" description="I am a self-motivated, hard-working, full-stack developer and educator with a strong passion for innovation and technology." />
            <div style={{ maxWidth: '850px' }} className="Page container">
                <h2 
                    style={{ display: 'flex', alignItems: 'center' }}>
                    {title}
                    <GatsbyImage 
                        style={{ height: '4rem', width: '4rem' }} 
                        className="rounded-circle img-fluid ms-2"
                        image={image}
                        alt={author.name}
                    />
                </h2>
                <p>
                    <small><strong>Last Updated: {updatedAt}</strong></small>
                </p>
                <p>
                    <small><strong>You can also download a copy <a href={`https:${resumePdf.file.url}`} download>here</a></strong></small>
                </p>
                <hr />
                <div dangerouslySetInnerHTML={{
                    __html: body.childMarkdownRemark.html
                }} />
            </div>
        </>
    );
}

export default Resume;

export const query = graphql`
    query Resume {
        contentfulResume(title: {eq: "My Resume"}) {
        title
        updatedAt(formatString: "MM/DD/YYYY")
        body {
            childMarkdownRemark {
                html
            }
        }
        author {
            name
            photo {
                gatsbyImageData(width: 500)
            }
        }
        resumePdf {
                file {
                    url
                }
            }
        }
    }  
`;