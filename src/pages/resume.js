import React from 'react';
import { graphql } from 'gatsby';
import Seo from '../components/seo';

function Resume({ data }) {
    return (
        <>
            <Seo title="My Resume" description="I am a self-motivated, hard-working, full-stack developer and educator with a strong passion for innovation and technology." />
            <div style={{ maxWidth: '850px' }} className="Page container">
                <h2 style={{ display: 'flex', alignItems: 'center' }}>{data.contentfulResume.title}</h2>
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

export default Resume;

export const query = graphql`
    query Resume {
        contentfulResume(title: {eq: "My Resume"}) {
        body {
            childMarkdownRemark {
                html
            }
        }
        author {
            name
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