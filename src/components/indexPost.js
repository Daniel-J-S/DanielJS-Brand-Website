import React from 'react';
import { Link } from 'gatsby';

export default class IndexPost extends React.Component {
    render() {
      const { allContentfulProduct } = this.props;
      return (
        <React.Fragment>
          <div className="row product-main">
            {allContentfulProduct.edges.map(items => {
              const sizes = items.node.sizes.map((s, i) => s.size).join('|');
              return (
                <div key={items.node.id} className="Catalogue__item col-sm-12 col-md-6 col-lg-4 text-dark">
                  <div className="details_List">
                    {items.node.image === null ? <div className="no-image">No Image</div> : <Img sizes={items.node.image.fluid} />}
                    <div className="details_inner">
                      <h2>
                        <Link to={`/${items.node.slug}`} >
                          {items.node.name}
                        </Link>
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
                            data-item-url={`/${items.node.slug}`}
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
              )
            })}
          </div>
        </React.Fragment>
      );
    }
  }