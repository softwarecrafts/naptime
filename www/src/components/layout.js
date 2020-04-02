/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import PropTypes from "prop-types"
// import { useStaticQuery, graphql } from "gatsby"
import { useStateValue } from "../utils/state";

import Header from "./header"
import Footer from "./footer"
import "./layout.css"

const Layout = ({ children, HeroComponent }) => {
  // const data = useStaticQuery(graphql`
  //   query SiteTitleQuery {
  //     site {
  //       siteMetadata {
  //         title
  //       }
  //     }
  //   }
  // `)
  const [{ theme }] = useStateValue();
  return (
    <div className={theme.bg.normal}>
      <HeroComponent>
        <Header />
      </HeroComponent>
      <main>{children}</main>
      <Footer/>
    </div>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
