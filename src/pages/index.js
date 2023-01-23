import React, { useState } from 'react';
import Seo from '../components/seo';
import Form from '../components/form';
import Banner from '../components/banner';
import ArticlePost from '../components/articlePost';
import SocialIcons from '../components/social-icons';
import { graphql } from 'gatsby';
import bio from '../data/bio.json';

const IndexPage = ({ data: { allContentfulHeaderBanner, allContentfulProduct, allContentfulArticle }, location }) => {
  const [bioLength, setBioLength] = useState(3);

  const [show, setShow] = useState(true)

  function handleClick(value) {
    setBioLength(value);
  }

  function toggle() {
    setShow(!show);
  }

  return (
    <>
      <Seo
        title="Home"
        keywords={[`gatsby`, `coding`, `react`, `learn to code`]}
        description={"Daniel has had a lifetime passion for web development. At the peak of his last career in finance, Daniel realized he wanted to develop software full-time, so he resigned from his job to open a Web Development Studio."}
        location={location}
      />
      <Banner BannerData={allContentfulHeaderBanner.edges} />
      <div className="container HomePage">
        <div className="text-center">
          <div className="with-underline p-3 mb-5 text-center">
            <small>Set Bio Length</small>
            <div className="mt-3">
              <button onMouseDown={toggle} onMouseUp={toggle} className={`btn btn-sm btn-${bioLength === 1 ? 'dark' : 'outline-dark'} ml-4`} onClick={() => handleClick(1)}>Short</button>
              <button onMouseDown={toggle} onMouseUp={toggle} className={`btn btn-sm btn-${bioLength === 2 ? 'dark' : 'outline-dark'} ml-4`} onClick={() => handleClick(2)}>Medium</button>
              <button onMouseDown={toggle} onMouseUp={toggle} className={`btn btn-sm btn-${bioLength === 3 ? 'dark' : 'outline-dark'} ml-4`} onClick={() => handleClick(3)}>Long</button>
            </div>
          </div>
          <div className="bio">
            {
              show &&
              <p className="p-3 mb-3" style={{ animation: 'fadeIn 1000ms ease-in forwards' }}>
                {bio[bioLength]}
              </p>
            }
          </div>
          <h3 className="mt-5">Connect With Daniel</h3>
          <SocialIcons />
          <div className="video-wrapper mt-5">
            <iframe width="560" height="315" src="https://www.youtube.com/embed/N8BhbtIa0as" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
          </div>
        </div>
      </div>

      <div className="Blog-section mt-5">
        <div className="container pt-5">
          <h3>Recent Articles</h3>
          <ArticlePost allContentfulArticle={allContentfulArticle} numPosts={3} />
        </div>
      </div>
      {/* <div className="Blog-section mt-5">
        <div className="container pt-5">
          <h3>Swag Shop</h3>
          <IndexPost allContentfulProduct={allContentfulProduct} />
        </div>
      </div> */}
      <div className="Contact-us mt-5" id="contact">
        <div className="container mt-3">
          <h3 className="mt-5 pt-5">Contact Me</h3>
          <Form />
        </div>
      </div>
    </>
  )
}

export default IndexPage

export const query = graphql`
  query AboutQuery {
    allContentfulProduct(limit: 6,sort:{fields:createdAt,order: DESC}){
      edges{
        node{
          id
          name
          slug
          rating
          sizes {
            size
          }
          image {
            fluid(maxWidth: 1000) {
              base64
              aspectRatio
              src
              srcSet
              srcWebp
              srcSetWebp
              sizes
            }
          }
          price
          details {
            childMarkdownRemark {
              excerpt(pruneLength: 140)
            }
          }
        }
      }
    }
    allContentfulHeaderBanner {
      edges {
        node {
          title
          subHeading
          image {
            fluid(maxWidth: 1800) {
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
    contentfulDealCountDown {
      title
      featureImage {
        fluid(maxWidth: 1800) {
          base64
          aspectRatio
          src
          srcSet
          srcWebp
          srcSetWebp
          sizes
        }
      }
      date(formatString: "D MMMM, YYYY")
    }
    allContentfulArticle(limit: 3,sort:{fields:createdAt,order: DESC}) {
      edges {
        node {
          id
          title
          slug
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
`