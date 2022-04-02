import React from 'react';
import { Link } from 'gatsby';
import Img from 'gatsby-image';
import SEO from '../components/seo';
import { graphql } from 'gatsby';

const TagButton = ({ handleClick, tag, tagSelected }) => {
  return (
    <button
      className={`btn btn-dark${!(tag === tagSelected) ? '' : ' border-warning text-warning'}`}
      onClick={() => handleClick(tag)}>
      {tag}
    </button>
  )
}

class ArticlePost extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      NoOfPost: 6,
      tags: [],
      tagSelected: null,
      filteredArticles: []
    };
  }

  componentDidMount() {
    const tags = this.props
      .data
      .data
      .allContentfulIdentifier
      .edges.map(({ node }) => node.identifier);

    this.setState({ tags });
    window.addEventListener('scroll', this.handleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  handleScroll = () => {
    var lastScrollY = window.pageYOffset + 1100;

    if (lastScrollY > window.outerHeight) {
      var count = this.state.NoOfPost + 3;
      this.setState({
        NoOfPost: count
      });
    }
  }

  handleClick = (tag) => {
    this.setState({ tagSelected: tag });
    const filteredArticles = this.props
      .data.data.allContentfulArticle.edges.filter(({ node }) => node.tags.find(t => t.identifier === tag));
    this.setState({ filteredArticles })
  }


  render() {

    const { NoOfPost, tagSelected, filteredArticles } = this.state;
    const { data: { allContentfulArticle } } = this.props.data;
    const articles = filteredArticles.length ? filteredArticles : allContentfulArticle;
    return (
      <React.Fragment>
        <div className="d-flex justify-content-around flex-wrap mb-5">
          {
            this.state.tags.map((tag, i) =>
              <TagButton
                key={i}
                handleClick={this.handleClick}
                tag={tag}
                tagSelected={tagSelected}
              />
            )
          }
        </div>
        <ul className="article-list" onScroll={this.onScrollEvent}>
          {articles.edges.slice(0, NoOfPost).map(({ node }) => {
            return (
              <li key={node.id}>
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
            )
          })}
        </ul>
      </React.Fragment>
    );
  }
}

const Articles = data => (
  <>
    <SEO
      title="Articles"
      keywords={[`gatsby`, `articles`, `react`]}
      location={data.location}
    />
    <div className="container article-page Page">
      <ArticlePost data={data} />
    </div>
  </>
)

export default Articles;

export const query = graphql`
  query ArticleQuery {
    allContentfulIdentifier {
      edges {
        node {
          identifier
        }
      }
    }
    allContentfulArticle {
        edges {
          node {
            id
            title
            slug
            tags {
              identifier
            }
            publicData(formatString: "MMMM D, YYYY")
            author {
              name
              photo {
                fluid(maxWidth: 350) {
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
            body {
              childMarkdownRemark {
                excerpt(pruneLength: 250)
                timeToRead  
              }
            }
            featureImage {
              fluid(maxWidth: 1120) {
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
      }
  }
`;



