import React, { useState } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { graphql } from 'gatsby';
import SEO from '../components/seo';

const ProductDetails = data => {
  const [selectState, setSelectState] = useState({
    value: 'Choose Size',
    userSelection: false
  });

  function handleChange(e) {
    setSelectState({value: e.target.value, userSelection: true});
  }


  const sizes = data.data.contentfulProduct.sizes.map((s, i) => s.size).join('|');
  const showSizeSelection = data.data.contentfulProduct.name !== "DanielJS Laptop Sticker";

  return (
    <>
      <SEO title={data.data.contentfulProduct.name} keywords={[`gatsby`, `application`, `react`]} />
      <div className="container details-page Page">
        <div className="product-details">
          <div className="Product-Screenshot">
            {data.data.contentfulProduct.productMorePhotos === null ? <div className="no-image">No Image</div> :
              <Tabs>
                {data.data.contentfulProduct.productMorePhotos.map(items => (
                  <TabPanel key={items.id}>
                    <Tab><img src={items.fixed.src} alt={items.id}/></Tab>
                  </TabPanel>
                ))}
                <TabList>
                  {data.data.contentfulProduct.productMorePhotos.map(items => (
                    <Tab key={items.id}><img src={items.fixed.src} alt={items.id}/></Tab>
                  ))}
                </TabList>
              </Tabs>}
          </div>
          <div>
            <h2>{data.data.contentfulProduct.name}</h2>
          </div>
          <div className="row buynowinner">
            <div className="col-sm-4 col-md-3">
              <span className="price">${data.data.contentfulProduct.price}</span>
              {
                showSizeSelection &&
                <select value={selectState.value} style={{padding: '.3rem', borderRadius: '7px'}} onChange={handleChange} onBlur={handleChange} className="form-select form-select-lg mb-3 mt-3">
                  <option value="Choose Size">Choose Size</option>
                  {data.data.contentfulProduct.sizes.map((s, i) => (
                    <option key={i} value={s.size}>{s.size}</option>
                  ))}
                </select>
              }
            </div>

              
              <div className="col-sm-12 col-md-12 text-left mt-3">
                <div className="row container mb-3">
                <button
                  style={{opacity: showSizeSelection? !selectState.userSelection ? .5: 1 : 1}}
                  className="Product snipcart-add-item btn btn-dark"
                  data-item-id={data.data.contentfulProduct.slug}
                  data-item-image={data.data.contentfulProduct.image === null ? "" : data.data.contentfulProduct.image.fixed.src}
                  data-item-price={data.data.contentfulProduct.price}
                  data-item-custom1-name={showSizeSelection ? 'Size': null}
                  data-item-custom1-options={showSizeSelection || null || selectState.userSelection ? selectState.value + '|' + sizes.split('|').filter(s => s !== selectState.value).join('|') : sizes}
                  data-item-name={data.data.contentfulProduct.name}
                  data-item-url={data.data.contentfulProduct.slug}                
                  disabled={showSizeSelection ? !selectState.userSelection : false}
                  >
                  <i className="fas fa-shopping-bag" />
                  Add to Cart
                </button> 
                </div>
            </div>
             
          </div>
          <div
            dangerouslySetInnerHTML={{
              __html: data.data.contentfulProduct.details.childMarkdownRemark.html
            }}
          />
        </div>
      </div>
    </>
  );
}

export default ProductDetails;

export const query = graphql`
  query ProductDetailsQuery($slug: String!) {
    contentfulProduct(slug: {eq: $slug }) {
      id
      name
      slug
      sizes {
        size
      }
      image {
        fixed(width: 1120, height: 500) {
        width
        height
        src
        srcSet
      }
    }
    price
      details {
      childMarkdownRemark {
        html
      }
    }
    productMorePhotos {
      id
      fixed(width: 1120, height: 600){
        src
      }
    }
    rating
  }
}`;