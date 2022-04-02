import React from "react"
import Img from "gatsby-image"
import { DiscussionEmbed } from "disqus-react";

import SEO from "../components/seo"
import { graphql } from "gatsby";

const disqusShortname = "danieljs";

const ArticleDetails = data => (
    <>
        <SEO
            title={data.data.contentfulArticle.title}
            keywords={data.data.contentfulArticle.keywords.map(k => k.identifier)}
            description={data.data.contentfulArticle.description}
            featuredImage={data.data.contentfulArticle.author.photo.fixed.src}
        />
        <div className="articles-page">
            <div className="post-thumbnail">
                <Img sizes={data.data.contentfulArticle.featureImage.fluid} />
            </div>
            <div className="container">
                <div className="post-details">
                    <h2 className="title">{data.data.contentfulArticle.title}</h2>
                    <div className="post-date">
                        <i className="fas fa-calendar-alt"></i>
                        {data.data.contentfulArticle.publicData}
                    </div>
                    <p><small className="text-muted">Time to read: {data.data.contentfulArticle.body.childMarkdownRemark.timeToRead} mins</small></p>
                    <div className="author">
                        <Img sizes={data.data.contentfulArticle.author.photo.fixed} />
                        <strong className="name">{data.data.contentfulArticle.author.name}</strong>
                    </div>
                    <div
                        dangerouslySetInnerHTML={{
                            __html: data.data.contentfulArticle.body.childMarkdownRemark.html
                        }}
                    />

                </div>
                <DiscussionEmbed
                    shortname={disqusShortname}
                    config={{
                        identifier: data.data.contentfulArticle.id,
                        title: data.data.contentfulArticle.title
                    }}
                />
            </div>
        </div>
    </>
);

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
            description
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
            body {
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
