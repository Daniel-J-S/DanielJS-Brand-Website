import React, { useState } from 'react';
import Seo from '../components/seo';
import Form from '../components/form';
import Banner from '../components/banner';
// Removing this for now import ArticlePost from '../components/articlePost';
import SocialIcons from '../components/social-icons';
import { graphql } from 'gatsby';
import bio from '../data/bio.json';

const Button = ({ toggle, bioLength, index, label, handleClick}) => {
  return (
    <button 
    onMouseDown={toggle} 
    onMouseUp={toggle} 
    className={`btn btn-sm btn-${bioLength === index ? 'dark' : 'outline-dark'} ms-2`} 
    onClick={() => handleClick(index)}>
      {label}
  </button>
  );
};

const buttonData = [
  {
    index: 1, 
    label: 'Short'
  },
  {
    index: 2, 
    label: 'Medium'
  },
  {
    index: 3, 
    label: 'Long'
  },
];

const IndexPage = ({ data: { contentfulHeaderBanner }, location }) => {
  const [bioLength, setBioLength] = useState(3);

  const [show, setShow] = useState(true);

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
      <Banner bannerData={contentfulHeaderBanner} />
      <div className="container HomePage">
        <div className="text-center">
          <div className="with-underline p-3 mb-5 text-center">
            <small>Set Bio Length</small>
            <div className="mt-3">
              {buttonData.map(({ index, label }) => (
                <Button 
                  key={index} 
                  index={index} 
                  label={label} 
                  toggle={toggle}
                  bioLength={bioLength} 
                  handleClick={handleClick} 
                />
              ))}
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
            <iframe width="560" height="315" src="https://www.youtube.com/embed/AjE9NwjhWlY" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
          </div>
        </div>
      </div>
      {/* 
      Removing this section for now
      <div className="Blog-section mt-5">
        <div className="container pt-5">
          <h3>Recent Articles</h3>
          <ArticlePost allContentfulArticle={allContentfulArticle} numPosts={3} />
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
query IndexQuery {
  contentfulHeaderBanner(title: {eq: "DanielJS"}) {
    title
    image {
      gatsbyImageData(width: 1200)
    }
  }
}`;

/*
Full version with article query
export const query = graphql`
query IndexQuery {
  contentfulHeaderBanner(title: {eq: "DanielJS"}) {
    title
    image {
      gatsbyImageData(width: 1200)
    }
  }
  allContentfulArticle(
      limit: 3
      sort: {createdAt: DESC}
      filter: {isFeatured: {eq: true}}
    ) {
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
*/