import React, { Fragment } from 'react';
import { Link } from 'gatsby';
import Img from 'gatsby-image';


function ArticlePost({ allContentfulArticle, numPosts }) {
    return (
        <Fragment>
            <ul className="article-list">
                {allContentfulArticle.edges.slice(0, numPosts).map(({ node }) => (
                    <li>
                        <div className="post-item template-square columned">
                            <div className="post-thumbnail">
                                <Img sizes={node.featureImage.fluid} />
                                <div className="post-date">
                                    <i className="fas fa-calendar-alt"></i>
                                    {node.publicData}
                                </div>
                            </div>
                            <div className="post-details">
                                <h2 className="post-title"><Link to={`/${node.slug}`}>{node.title}</Link></h2>
                                <div className="author">
                                    <Img sizes={node.author.photo.fluid} />
                                    <strong className="name">{node.author.name}</strong>
                                </div>
                                <p><small className="text-muted">Time to read: {node.body.childMarkdownRemark.timeToRead} mins</small></p>
                                <p>{node.body.childMarkdownRemark.excerpt}</p>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
        </Fragment>
    );
}

export default ArticlePost;