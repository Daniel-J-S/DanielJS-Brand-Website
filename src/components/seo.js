import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { useStaticQuery, graphql } from 'gatsby';
import ogImage from '../images/og-image.png';

function Seo({ description, lang, meta, keywords, title, location, featuredImage }) {

  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
            description
            author
          }
        }
      }
    `
  );
  const ogDescription = 'My main area of expertise is Full-Stack Software Engineering with the JavaScript programming language. I also teach others how to become software engineers. I also have extensive knowledge and experience building courseware used to teach software development to beginners.'
  const metaDescription = description || site.siteMetadata.description;
  const isHomePage = location && location.pathname === '/'
  return (
    <Helmet
      htmlAttributes={{
        lang,
      }}
      title={title}
      titleTemplate={`%s | ${site.siteMetadata.title}`}
      meta={[
        {
          name: `description`,
          content: metaDescription,
        },
        {
          property: `og:title`,
          content: isHomePage ? 'Hi There, I\'m DanielJS' : `${title} | DanielJS`,
        },
        {
          property: `og:description`,
          content: isHomePage ? ogDescription : description,
        },
        {
          property: `og:type`,
          content: `website`,
        },
        {
          property: `og:image`,
          content: featuredImage ? `https:${featuredImage}` : `https://danieljs.io/${ogImage}`,
        },
        {
          name: `twitter:card`,
          content: `summary`,
        },
        {
          name: `twitter:creator`,
          content: site.siteMetadata.author,
        },
        {
          name: `twitter:title`,
          content: title,
        },
        {
          name: `twitter:description`,
          content: metaDescription,
        },
      ]
        .concat(
          keywords.length > 0
            ? {
              name: `keywords`,
              content: keywords.join(`, `),
            }
            : []
        )
        .concat(meta)}
    />
  )
}

Seo.defaultProps = {
  lang: `en`,
  meta: [],
  keywords: [],
  description: ``,
}

Seo.propTypes = {
  description: PropTypes.string,
  lang: PropTypes.string,
  meta: PropTypes.arrayOf(PropTypes.object),
  keywords: PropTypes.arrayOf(PropTypes.string),
  title: PropTypes.string.isRequired,
}

export default Seo;