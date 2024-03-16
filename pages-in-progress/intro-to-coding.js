import React from 'react';
import { graphql } from 'gatsby';
import Seo from '../components/seo';

function IntroToCoding({ data }) {
    return (
        <>
            <Seo title="Intro to Coding" description="In this tutorial, we'll learn the fundamentals of web development and build our first website" />
            <div style={{ maxWidth: '850px' }} className="Page container">
                <h2 style={{ display: 'flex', alignItems: 'center' }}>{data.contentfulTutorial.title}</h2>
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
          }
        title
        updatedAt(formatString: "MM/DD/YYYY")
        }
    }  
`;