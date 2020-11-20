/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/browser-apis/
 */

// You can delete this file if you're not using it

const React = require("react");
const { FormspreeProvider } = require("@formspree/react");

const { initialState, reducer, StateProvider } = require("./src/utils/state");

exports.wrapRootElement = ({ element }) => {
  return (
    <FormspreeProvider project="1520600280918392420">
      <StateProvider initialState={initialState} reducer={reducer}>
        {element}
      </StateProvider>
    </FormspreeProvider>
  );
};
