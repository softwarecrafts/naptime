import React from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"
import { useStateValue } from "../utils/state";


const Hero404 = ({ children }) => {
    const [{ theme }] = useStateValue();
    return (
  <div className={`relative ${theme.bg.normal} overflow-hidden`}>
    <div className="relative pt-6 pb-4">
      {children}

      <div className="mt-10 mx-auto max-w-screen-xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 xl:mt-28">
        <div className="text-center">
          <h2 className={`text-4xl tracking-tight leading-10 font-extrabold font-serif ${theme.text.normal} sm:text-5xl sm:leading-none md:text-6xl`}>
            404: Not Found
          </h2>
        </div>
      </div>
    </div>
  </div>
)};


const NotFoundPage = () => {
    const [{ theme }] = useStateValue();
    return (
  <Layout HeroComponent={Hero404}>
    <SEO title="404: Not found" />
    <div className={`relative ${theme.bg.normal} ${theme.text.normal} overflow-hidden`}>
        <div className="text-lg text-center my-10">
            <h3 className="font-hairline text-3xl">We lost you!</h3>
            <br/> Returning to our <a className={`${theme.text.accent6} hover:no-underline underline`} href="/">Homepage</a> will get you back in the right direction!
        </div>
    </div>
  </Layout>
)}

export default NotFoundPage
