import React from "react"
import Img from "gatsby-image"
import { DiscussionEmbed } from "disqus-react";

import SEO from "../components/seo"
import { graphql } from "gatsby";

const disqusShortname = "danieljs";

const ArticleDetails = data => (
    <>
        <SEO title={data.data.contentfulArticles.title} keywords={[`gatsby`, `ecommerce`, `react`, `contentFul`, `Snipcart`]} />
        <div className="articles-page">
            <div className="post-thumbnail">
                <Img sizes={data.data.contentfulArticles.featureImage.fluid} />
            </div>
            <div className="container">
                <div className="post-details">
                    <h2 className="title">{data.data.contentfulArticles.title}</h2>
                    <div className="post-date">
                        <i className="fas fa-calendar-alt"></i>
                        {data.data.contentfulArticles.publicData}
                    </div>
                    <p><small className="text-muted">Time to read: {data.data.contentfulArticles.description.childMarkdownRemark.timeToRead} mins</small></p>
                    <div className="author">
                        <Img sizes={data.data.contentfulArticles.author.photo.fixed} />
                        <strong className="name">{data.data.contentfulArticles.author.name}</strong>
                    </div>
                    <div
                        dangerouslySetInnerHTML={{
                            __html: data.data.contentfulArticles.description.childMarkdownRemark.html
                        }}
                    />

                </div>
                <DiscussionEmbed
                    shortname={disqusShortname}
                    config={{
                        identifier: data.data.contentfulArticles.id,
                        title: data.data.contentfulArticles.title
                    }}
                />
            </div>
        </div>
    </>
);

export default ArticleDetails;

export const query = graphql`
  query ArticleDetailsQuery($slug: String!) {
        contentfulArticles(slug: {eq: $slug }) {
            id
            title
            slug
            publicData(formatString: "MMMM D, YYYY")
            author {
            name
            photo {
                fixed(width: 50, height: 50) {
                width
                height
                src
                srcSet
                }
            }
            }
            description {
                childMarkdownRemark {
                    html
                    timeToRead
                }
            }
            featureImage {
                fluid {
                    base64
                    aspectRatio
                    src
                    srcSet
                    srcWebp
                    srcSetWebp
                    sizes
                  }
            }
        }
    }
`;
