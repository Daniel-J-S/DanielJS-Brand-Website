import React, { useState } from 'react';
import { Link } from 'gatsby';
import Img from 'gatsby-image';
import SEO from '../components/seo';
import Form from '../components/form';
import Banner from '../components/banner';
import SocialIcons from '../components/social-icons';
import { graphql } from 'gatsby';
import bio from '../data/bio.json';


class IndexPost extends React.Component {
  render() {
    const { data } = this.props;
    return (
      <React.Fragment>
        <div className="row product-main">
          {data.data.allContentfulProduct.edges.map(items => { 
            const sizes = items.node.sizes.map((s, i) => s.size).join('|');
            return (
            <Link to={`/${items.node.slug}`} key={items.node.id} className="Catalogue__item col-sm-12 col-md-6 col-lg-4 text-dark">
            <div>
              <div className="details_List">
                {items.node.image === null ? <div className="no-image">No Image</div> : <Img sizes={items.node.image.fluid} />}
                <div className="details_inner">
                  <h2>
                    {items.node.name}
                  </h2>
                  <p>{items.node.details.childMarkdownRemark.excerpt}</p>
                  <div className="row">
                    <div className="col-sm-4 align-self-center mb-3">
                      <span className="price"><small>${items.node.price}</small></span>
                    </div>
                    <div className="col-sm-8 text-right align-self-center mb-3">
                      <button
                        className="btn btn-sm Product snipcart-add-item"
                        data-item-id={items.node.slug}
                        data-item-price={items.node.price}
                        data-item-image={items.node.image === null ? "" : items.node.image.fluid.src}
                        data-item-name={items.node.name}
                        data-item-url={`/`}
                        data-item-custom1-name="Size"
                        data-item-custom1-options={sizes}
                      >
                        <i className="fas fa-shopping-bag" />Add to Cart
                    </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            </Link>
          )})}
        </div>
      </React.Fragment>
    );
  }
}

const IndexPage = data => {
    const [bioLength, setBioLength] = useState(3);
    return (
    <>
      <SEO title="Home" keywords={[`gatsby`, `coding`, `react`, `learn to code`]} />
      <Banner BannerData={data.data.allContentfulHeaderBanner.edges} />
      <div className="container Page">
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
        
        <div className="Blog-section mt-5">
          <div className="container pt-5">
            <h3>Swag Shop</h3>
            <IndexPost data={data} />
          </div>
        </div>
        <div className="Contact-us mt-5">
            <div className="container mt-3">
              <h3 className="mt-5" id="contact">Contact Me</h3>
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