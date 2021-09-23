import React, { useState } from "react"
import { Link } from "gatsby"
import Img from "gatsby-image"
import Layout from "../components/layout"
import SEO from "../components/seo"
import Form from "../components/form"
import Banner from "../components/banner"
import SocialIcons from "../components/social-icons"
import LatestBlogs from "../components/latestBlog"
// import Countdown from "../components/countdown"
import StarRatingComponent from 'react-star-rating-component'
import { graphql } from "gatsby"
import bio from "../data/bio.json"


class IndexPost extends React.Component {
  render() {
    const { data } = this.props;
    return (
      <React.Fragment>
        <div className="row product-main">
          {data.data.allContentfulProduct.edges.map(items => (
            <div className="Catalogue__item col-sm-12 col-md-6 col-lg-4" key={items.node.id}>
              <div className="details_List">
                {items.node.image === null ? <div className="no-image">No Image</div> : <Img sizes={items.node.image.fluid} />}

                <div className="details_inner">

                  <h2>
                    <Link to={`/${items.node.slug}`}>{items.node.name}</Link>
                  </h2>
                  <StarRatingComponent
                    name="rate1"
                    starCount={5}
                    value={items.node.rating}
                  />
                  <p>{items.node.details.childMarkdownRemark.excerpt}</p>
                  <div className="row">
                    <div className="col-sm-4 align-self-center">
                      <span className="price">${items.node.price}</span>
                    </div>
                    <div className="col-sm-8 text-right align-self-center">
                      <a
                        href="#"
                        className="Product snipcart-add-item"
                        data-item-id={items.node.slug}
                        data-item-price={items.node.price}
                        data-item-image={items.node.image === null ? "" : items.node.image.fluid.src}
                        data-item-name={items.node.name}
                        data-item-url={`/`}
                      >
                        <i className="fas fa-shopping-bag" />Add to Cart
                    </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </React.Fragment>
    );
  }
}

const IndexPage = data => {
    const [bioLength, setBioLength] = useState(3);
    return (
    <Layout location={data.location}>
      <SEO title="Home" keywords={[`gatsby`, `coding`, `react`, `learn to code`]} />
      <Banner BannerData={data.data.allContentfulHeaderBanner.edges} />
      <div className="container mb-5">
        <div className="text-center">
          <div className="with-underline p-3 mb-5 text-center">
            <small>Set Bio Length</small>
            <div className="mt-3">
              <button className={`btn btn-sm btn-${bioLength === 1 ? 'dark' : 'outline-dark'} ml-4`} onClick={() => setBioLength(1)}>Short</button>
              <button className={`btn btn-sm btn-${bioLength === 2 ? 'dark' : 'outline-dark'} ml-4`} onClick={() => setBioLength(2)}>Medium</button>
              <button className={`btn btn-sm btn-${bioLength === 3 ? 'dark' : 'outline-dark'} ml-4`} onClick={() => setBioLength(3)}>Long</button>
            </div>
          </div>
          <p className="p-3 mb-3">
            {bio[bioLength]}
          </p>
            <h3 className="mt-5">Connect With Daniel</h3>
            <SocialIcons />
            <div className="video-wrapper mt-5">
              <iframe width="560" height="315" src="https://www.youtube.com/embed/d7b60PI8VLI" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
            </div>
          </div>
        </div>
        <div className="Blog-section">
          <LatestBlogs data={data.data.allContentfulBlogs} />
        </div>
        <div className="Contact-us mt-5">
            <div className="container mt-5">
              <h3 className="mt-5" id="contact">Contact Me</h3>
                <Form />
            </div>
          </div>
      
      {/* <div className="container">
        <div className="text-center"><h2 className="with-underline">Latest Items</h2></div>
        <IndexPost data={data}></IndexPost>
      </div> */}
      {/* <Countdown data={data.data.contentfulDealCountDown} /> */}
    </Layout>
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
    allContentfulBlogs(limit: 3,sort:{fields:createdAt,order: DESC}) {
      edges {
        node {
          id
          title
          slug
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