import { Link, navigate } from 'gatsby';
import PropTypes from 'prop-types';
import React from 'react';
import logo from '../images/logo.png';
import scrollTo from 'gatsby-plugin-smoothscroll';



const Header = ({ siteTitle, location}) => {
  function handleNav(id) {
    if(location && location.pathname !== '/') {
      navigate(`/#${id}`);
    } else {
      scrollTo(`#${id}`);
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
                {
                  location && location.pathname !== '/' &&
                  <li className="nav-item">
                    <Link className="nav-link" to="/">Home</Link>
                  </li>
                }
                {/* 
                Removing for now until I get more articles
                <li className="nav-item">
                  <span className="nav-link" onClick={() => handleNav('articles')}>Articles</span>
                </li> */}
                {/* <li className="nav-item">
                  <span onKeyDown={() => handleNav('videos')} tabIndex="0" role="link" className="nav-link" onClick={() => handleNav('videos')}>Videos</span>
                </li> */}
                <li className="nav-item">
                    <Link className="nav-link" to="/videos">My Videos</Link>
                </li>
                <li className="nav-item">
                  <span onKeyDown={() => handleNav('contact')} tabIndex="0" role="link" className="nav-link" onClick={() => handleNav('contact')}>Contact Me</span>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="/work-request">Web Development</Link>
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
};

Header.defaultProps = {
  siteTitle: ``,
};

export default Header;
