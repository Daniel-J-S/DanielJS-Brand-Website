import React from 'react';
import { Link } from 'gatsby';
import Seo from '../components/seo';
import { graphql } from 'gatsby';

class ArticlePost extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      NoOfPost: 6
    };
    this.handleScroll = this.handleScroll.bind(this);
  }

  componentDidMount() {
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
  };

  render() {

    const { data } = this.props;
    const { NoOfPost } = this.state;

    return (
      <React.Fragment>
        <ul className="article-list" onScroll={this.onScrollEvent}>
          {data.data.allContentfulArticle.edges.slice(0, NoOfPost).map(items => (
            <li>
              <div className="post-item template-square columned">
                <div className="post-thumbnail">
                  <div className="post-date">
                    <i className="fas fa-calendar-alt"></i>
                    {items.node.publicData}
                  </div>
                </div>
                <div className="post-details">
                  <h2 className="post-title"><Link to={`/${items.node.slug}`}>{items.node.title}</Link></h2>
                  <div className="author">
                    <strong className="name">{items.node.author.name}</strong>
                  </div>
                  <p><small className="text-muted">Time to read: {items.node.body.childMarkdownRemark.timeToRead} mins</small></p>
                  <p>{items.node.body.childMarkdownRemark.excerpt}</p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </React.Fragment>
    );
  }
}

const Articles = data => (
  <>
    <Seo
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
    allContentfulArticle {
        edges {
          node {
            id
            title
            slug
            publicData(formatString: "MMMM D, YYYY")
            author {
              name
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
  }
`;



