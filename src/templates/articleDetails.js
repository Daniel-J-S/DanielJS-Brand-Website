import React from 'react';
import { DiscussionEmbed } from 'disqus-react';
import { GatsbyImage, getImage } from 'gatsby-plugin-image'

import Seo from '../components/seo';
import { graphql } from 'gatsby';

const disqusShortname = 'danieljs';

const ArticleDetails = ({ data: { contentfulArticle } }) => {
    const featureImage = getImage(contentfulArticle.featureImage);
    const authorImage = getImage(contentfulArticle.author.photo);
    return (
        <>
            <Seo
                title={contentfulArticle.title}
                keywords={contentfulArticle.keywords.map(k => k.identifier)}
                description={contentfulArticle.description}
            />
            <div className="articles-page">
                <div className="post-thumbnail">
                    <GatsbyImage style={{ margin: '0 auto'}} image={featureImage} alt={contentfulArticle.title}/>
                </div>
                <div className="container">
                    <div className="post-details">
                        <h2 className="title">{contentfulArticle.title}</h2>
                        <div className="post-date">
                            <i className="fas fa-calendar-alt"></i>
                            {contentfulArticle.publicData}
                        </div>
                        <p><small className="text-muted">Time to read: {contentfulArticle.body.childMarkdownRemark.timeToRead} mins</small></p>
                        <div className="author">
                            <GatsbyImage image={authorImage} alt={contentfulArticle.author.name} />
                            <strong className="name">{contentfulArticle.author.name}</strong>
                        </div>
                        <div
                            dangerouslySetInnerHTML={{
                                __html: contentfulArticle.body.childMarkdownRemark.html
                            }}
                        />

                    </div>
                    <DiscussionEmbed
                        shortname={disqusShortname}
                        config={{
                            identifier: contentfulArticle.id,
                            title: contentfulArticle.title
                        }}
                    />
                </div>
            </div>
        </>
    );
};

export default ArticleDetails;

export const query = graphql`
  query ArticleDetailsQuery($slug: String!) {
        contentfulArticle(slug: {eq: $slug }) {
            id
            title
            slug
            tags {
                identifier
            }
            keywords {
                identifier
            }
            featureImage {
                gatsbyImageData(width: 5000)
            }
            description
            publicData(formatString: "MMMM D, YYYY")
            author {
                name
                photo {
                    gatsbyImageData(width: 500)
                }
            }
            body {
                childMarkdownRemark {
                    html
                    timeToRead
                }
            }
        }
    }
`;
