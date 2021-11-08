import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { StaticQuery, graphql } from 'gatsby';
import '../css/font-awesome.css';
import 'bootstrap/dist/css/bootstrap.css';
import '../css/style.css';
import Header from './header';
import Footer from './footer';
import ogImage from '../images/og-image.png';
import { consoleimg } from '../utils/console-img';

const Layout = ({ children, location }) => { 
  const [darkenBackground, setDarkenBackground] = useState(false);
  
  
  consoleimg.load('https://media.giphy.com/media/xT9IgzoKnwFNmISR8I/giphy.gif');
  
  return (
    <StaticQuery
      query={graphql`
        query SiteTitleQuery {
          site {
            siteMetadata {
              title
            }
          }
        }
      `}
      render={data => (
        <>
          <Header darkenBackground={darkenBackground} setDarkenBackground={setDarkenBackground} siteTitle={data.site.siteMetadata.title} location={location}/>
            <div style={{
              opacity: darkenBackground ? '.2' : '1',
              minHeight: '100vh',
              backgroundColor: 'white',
              zIndex: 9999,
              width: '100vw',
              animation: darkenBackground ? 'fadeOut 500ms ease-out backwards':'none'
            }}>
              <main>{children}</main>
            </div>
          <Footer darkenBackground={darkenBackground} />
        </>
      )}
    />
  )
}


Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout





