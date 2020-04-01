/**
 * Implement Gatsby's SSR (Server Side Rendering) APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/ssr-apis/
 */

// You can delete this file if you're not using it

const React = require("react")
const { StaticKitProvider } = require('@statickit/react');



exports.wrapRootElement = ({ element }) => {
  return (
    <StaticKitProvider site="ffcc8d4ce743">
      {element}
    </StaticKitProvider>
  )
}
