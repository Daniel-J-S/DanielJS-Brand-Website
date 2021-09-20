var dotenv = require("dotenv");
dotenv.config();

const { spaceId, accessToken, snipcart } = process.env;

module.exports = {
  siteMetadata: {
    title: `DanielJS Brand Website`,
    description: `A Brand Website For the DanielJS Brand`,
    author: `DanielJS`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    `gatsby-transformer-remark`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `DanielJS`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#FBE693`,
        theme_color: `#FBE693`,
        display: `minimal-ui`,
        icon: `src/images/logo.png`,
      },
    },
    {
      resolve: "gatsby-source-contentful",
      options: {
        spaceId,
        accessToken
      }
    },
    {
      resolve: "gatsby-plugin-snipcartv3",
      options: {
        apiKey: snipcart,
        autopop: true,
      },
    },
  ],
}
