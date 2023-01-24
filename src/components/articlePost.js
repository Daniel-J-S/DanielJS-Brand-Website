import React, { Fragment } from 'react';
import { Link } from 'gatsby';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';

function ArticlePost({ allContentfulArticle, numPosts }) {
    console.log(allContentfulArticle)
    return (
        <Fragment>
            <ul className="article-list">
                {allContentfulArticle.edges.slice(0, numPosts).map(({ node }, index) => { 
                    const featureImage = getImage(node.featureImage);
                    const authorImage = getImage(node.author.photo);
                    return (
                        <li key={index}>
                            <div className="post-item template-square columned" style={{ marginTop: index === 0 ? '1rem': '5rem'}}>
                                <div className="post-thumbnail">
                                    <GatsbyImage image={featureImage} alt={node.title} />
                                    <div className="post-date">
                                        <i className="fas fa-calendar-alt"></i>
                                        {node.publicData}
                                    </div>
                                </div>
                                <div className="post-details">
                                    <h2 className="post-title"><Link to={`/${node.slug}`}>{node.title}</Link></h2>
                                    <div className="author">
                                        <GatsbyImage image={authorImage} alt={node.author.name} />
                                        <strong className="name">{node.author.name}</strong>
                                    </div>
                                    <p><small className="text-muted">Time to read: {node.body.childMarkdownRemark.timeToRead} mins</small></p>
                                    <p>{node.body.childMarkdownRemark.excerpt}</p>
                                </div>
                            </div>
                        </li>
                    )
                })}
            </ul>
        </Fragment>
    );
}

export default ArticlePost;