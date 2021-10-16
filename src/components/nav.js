import React, { useState, useEffect, useRef } from 'react';
import { Link, navigate } from 'gatsby';
import { CSSTransition } from 'react-transition-group';
import scrollTo from 'gatsby-plugin-smoothscroll';
import logo from '../images/logo.png';



const ResponsiveNav = ({ location }) => {
  const [isNavVisible, setNavVisibility] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(true);
  const [showItemsCount, setShowItemsCount] = useState(false)

  const itemsCount = useRef();

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 1065px)');
    mediaQuery.addEventListener('change', handleMediaQueryChange);
    handleMediaQueryChange(mediaQuery);

    return () => {
      mediaQuery.removeEventListener('change', handleMediaQueryChange);
    };
  }, []);


  const handleMediaQueryChange = mediaQuery => {
    if (mediaQuery.matches) {
      setIsSmallScreen(true);
    } else {
      setIsSmallScreen(false);
    }
  };

  const toggleNav = () => {
    setNavVisibility(!isNavVisible);
  };

    function handleNav(id) {
        if(location && location.pathname !== '/') {
        navigate(`/#${id}`);
        } else {
        scrollTo(`#${id}`);
        }
        toggleNav();
    }

  const links = (
      <>
        <Link activeStyle={{margin: 0}} activeClassName="with-underline" className="nav-link" to="/videos">My Videos</Link>
        <Link activeStyle={{margin: 0}} activeClassName="with-underline" className="nav-link" to="/work-request">Web Development</Link>
        <span onKeyDown={() => handleNav('contact')} tabIndex="0" role="link" className="nav-link" onClick={() => handleNav('contact')}>Contact Me</span>
      </>
  );

  const handleMutations = function(mutations) {
    mutations.forEach(function(mutation) {
        if(mutation.target.innerHTML === "0") {
          setShowItemsCount(false)
        } else {
          setShowItemsCount(true)
        }
    });
  }

  if(typeof window !== "undefined") {
    const observer = new MutationObserver(handleMutations);

    if(itemsCount.current) {
      observer.observe(itemsCount.current, { childList: true });
    }
  }
  


  return (
    <div className="nav-wrapper" style={{boxShadow: !isNavVisible ? '0 4px 8px 0 rgba(0, 0, 0, 0.2)': 'none !important'}}>
      <Link to="/" onClick={() => setNavVisibility(false)}>
        <img className="logo" src={logo} alt="logo" />
      </Link>
      <CSSTransition
        in={isSmallScreen && isNavVisible}
        timeout={350}
        classNames="navAnimation"
        unmountOnExit
      >
        <nav className="nav">
          { links }
        </nav>
      </CSSTransition>
      {
        !isSmallScreen &&
        <nav className="nav">
          { links }
        </nav>
      }
      <div className="header-cart">
        <span style={{visibility: showItemsCount ? 'visible' : 'hidden'}} className="Header__summary snipcart-summary snipcart-checkout">
          <div ref={itemsCount} className="snipcart-items-count" />
          <i className="fas fa-sm fa-shopping-bag" />
        </span>
      </div>
      <button onClick={toggleNav} className="burger">
        <div className={isNavVisible ? 'burger-animate': 'fixed'} />
        <div className={isNavVisible ? 'burger-animate': 'fixed'} />
        <div className={isNavVisible ? 'burger-animate': 'fixed'} />
      </button>
    </div>
  );
};

export default ResponsiveNav;
