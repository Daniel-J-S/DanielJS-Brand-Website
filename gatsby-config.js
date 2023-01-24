var dotenv = require("dotenv");
dotenv.config();

const { spaceId, accessToken, snipcart, websiteId } = process.env;

module.exports = {
  siteMetadata: {
    title: `DanielJS`,
    description: `A Brand Website For DanielJS`,
    author: `DanielJS`,
  },
  plugins: [
    `gatsby-plugin-image`,
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-smoothscroll`,
    {
      resolve: `gatsby-plugin-layout`,
      options: {
        component: require.resolve(`./src/components/layout.js`),
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [`gatsby-remark-responsive-iframe`],
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `DanielJS`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#fff`,
        theme_color: `#fff`,
        display: `minimal-ui`,
        icon: `src/images/icon_logo.png`,
      },
    },
    {
      resolve: "gatsby-source-contentful",
      options: {
        spaceId,
        accessToken
      }
    },
    // {
    //   resolve: "gatsby-plugin-snipcartv3",
    //   options: {
    //     apiKey: snipcart,
    //     autopop: true,
    //     language: null,
    //   },
    // },
    {
      resolve: `gatsby-plugin-offline`,
      options: {
        precachePages: [`/`]
      }
    },
  ],
}
