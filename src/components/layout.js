import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { StaticQuery, graphql } from 'gatsby';
import '../css/font-awesome.css';
import 'bootstrap/dist/css/bootstrap.css';
import '../css/style.css';

import Header from './header';
import Footer from './footer';

const Layout = ({ children, location }) => { 
  const [darkenBackground, setDarkenBackground] = useState(false);
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
          <div style={{ opacity: darkenBackground ? '.2': '1', animation: darkenBackground ? 'fadeOut 700ms ease-out backwards' : 'fadeIn 500ms ease-in forwards' }}>
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
