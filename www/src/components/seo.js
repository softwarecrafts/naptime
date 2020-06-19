/**
 * SEO component that queries for data with
 *  Gatsby's useStaticQuery React hook
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import PropTypes from "prop-types"
import Helmet from "react-helmet"
import { useStaticQuery, graphql } from "gatsby"
import { useStateValue } from "../utils/state"

function SEO({ description, lang, meta, title }) {
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
  )
  const [{ theme }] = useStateValue()

  const metaDescription = description || site.siteMetadata.description

  return (
    <Helmet
      htmlAttributes={{
        lang,
        class: theme.bg.normal,
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
          content: title,
        },
        {
          property: `og:description`,
          content: metaDescription,
        },
        {
          property: `og:type`,
          content: `website`,
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
      ].concat(meta)}>
      <link
        href="https://fonts.googleapis.com/css?family=Roboto+Slab:100,200,300,400,500,600,700,800,900|Roboto:100,300,400,500,700,900&display=swap"
        rel="stylesheet"
      />
      <link rel="apple-touch-icon" sizes="180x180" href={`/icons/${theme.name}/apple-touch-icon.png`} />
      <link rel="icon" type="image/png" sizes="32x32" href={`/icons/${theme.name}/favicon-32x32.png`} />
      <link rel="icon" type="image/png" sizes="16x16" href={`/icons/${theme.name}/favicon-16x16.png`} />
      <link rel="manifest" href={`/icons/${theme.name}/site.webmanifest`} />
      <link rel="mask-icon" href={`/icons/${theme.name}/safari-pinned-tab.svg`} color="#a4baed" />
      <meta name="msapplication-TileColor" content="#a4baed" />
      <meta name="theme-color" content="#a4baed" />
      <script
        data-name="BMC-Widget"
        src="https://cdnjs.buymeacoffee.com/1.0.0/widget.prod.min.js"
        data-id="softwarecrafts"
        data-description="Support naptime with Green Tea!"
        data-message="Thank you for your donation. Every tea helps!"
        data-color="#5F7FFF"
        data-position="left"
        data-x_margin="18"
        data-y_margin="18"></script>
    </Helmet>
  )
}

SEO.defaultProps = {
  lang: `en`,
  meta: [],
  description: ``,
}

SEO.propTypes = {
  description: PropTypes.string,
  lang: PropTypes.string,
  meta: PropTypes.arrayOf(PropTypes.object),
  title: PropTypes.string.isRequired,
}

export default SEO
