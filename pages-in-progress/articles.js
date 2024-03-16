import React, { Component, Fragment } from 'react';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import { Link } from 'gatsby';
import Seo from '../components/seo';
import { graphql } from 'gatsby';

class ArticlePost extends Component {
  state = {
    noOfPost: 6
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  handleScroll = () => {
    const lastScrollY = window.pageYOffset + 1100;

    if (lastScrollY > window.outerHeight) {
      const count = this.state.noOfPost + 3;
      this.setState({
        noOfPost: count
      });
    }
  }

  render() {

    const { allContentfulArticle } = this.props;
    const { noOfPost } = this.state;

    return (
      <Fragment>
        <ul className="article-list" onScroll={this.onScrollEvent}>
          {allContentfulArticle.edges.slice(0, noOfPost).map(({ node })=> {
            
            const featureImage = getImage(node.featureImage);
            const authorImage = getImage(node.author.photo);
            
            return (
              <li key={node.id} className="mt-5 mb-5 pb-5">
                <div className="post-item template-square columned">
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
}

const Articles = ({ data: {allContentfulArticle}, location }) => (
  <>
    <Seo
      title="Articles"
      keywords={[`gatsby`, `articles`, `react`]}
      location={location}
    />
    <div className="container article-page Page">
      <ArticlePost allContentfulArticle={allContentfulArticle} />
    </div>
  </>
)

export default Articles;

export const query = graphql`
  query ArticleQuery {
    allContentfulArticle {
    edges {
      node {
        id
        title
        slug
        featureImage {
          gatsbyImageData(width: 900)
        }
        author {
          name
          photo {
            gatsbyImageData(width: 500)
          }
        }
        body {
          childMarkdownRemark {
            excerpt(pruneLength: 250)
            timeToRead
          }
        }
      }
    }
  }
}`;



