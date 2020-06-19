/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.org/docs/gatsby-config/
 */

module.exports = {
  /* Your site config here */
  siteMetadata: {
      title: `Software Crafts Gatsby Starter`,
  },
  plugins: [
      `gatsby-plugin-postcss`,
      `gatsby-plugin-react-helmet`,
      `gatsby-transformer-sharp`,
      `gatsby-plugin-sharp`,
      {
        resolve: `gatsby-plugin-typescript`,
        options: {
          // isTSX: true, // defaults to false
          // jsxPragma: `jsx`, // defaults to "React"
          // allExtensions: true, // defaults to false
        },
      },
      'gatsby-plugin-tslint',
      {
        resolve: `gatsby-plugin-manifest`,
        options: {
          name: `Software Crafts`,
          short_name: `Software Crafts`,
          start_url: `/`,
          background_color: `#f1ece1`,
          theme_color: `#f1ece1`,
          display: `minimal-ui`,
          icon: `static/favicon.ico`, // This path is relative to the root of the site.
        },
      },
  ],
}
