import { Link, navigate } from "gatsby"
import PropTypes from "prop-types"
import React from "react"
import SEO from "../components/seo"
import logo from "../images/logo.png"
import scrollTo from 'gatsby-plugin-smoothscroll'



const Header = ({ siteTitle, location}) => {
  function handleNav() {
    if(location && location.pathname !== '/') {
      navigate('/#contact');
    } else {
      scrollTo('#contact')
    }
  }
  return (
    <header className="site-header">
      <div className="container">
        <div className="row">
          <div className="col-sm-12 col-md-4 align-self-center">
            <Link className="header-logo" to="/"><img src={logo} alt="logo" style={{height: 65, width: 65}}></img></Link>
          </div>
          <div className="col-sm-12 col-md-8 align-self-center">
            <nav>
              <ul className="navbar-nav ml-auto light">
                <li className="nav-item active">
                  <Link className="nav-link" to="/">Home</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/blogs">Articles</Link>
                </li>
                <li className="nav-item">
                  <span className="nav-link" onClick={handleNav}>Contact</span>
                </li>
              </ul>
              <div className="header-cart">
                {/* <Link className="Header__summary snipcart-summary snipcart-checkout" to="#">
                  <i className="fas fa-cart-plus"></i>
                </Link> */}
                {/* <button class="snipcart-add-item"
                  data-item-id="starry-night"
                  data-item-price="79.99"
                  data-item-url="/paintings/starry-night"
                  data-item-description="High-quality replica of The Starry Night by the Dutch post-impressionist painter Vincent van Gogh."
                  data-item-image="/assets/images/starry-night.jpg"
                  data-item-name="The Starry Night">
                  Add to cart
                </button> */}
              </div>
            </nav>
          </div>
        </div>
      </div>
    </header >
  );
}

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
