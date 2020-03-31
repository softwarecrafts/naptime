import React from "react"

import Layout from "../components/layout"
import Features from '../components/features'
// import Faqs from '../components/faqs'
import SignUp from '../components/signup'
import Hero from '../components/hero'
import SEO from "../components/seo"

const IndexPage = () => (
  <Layout HeroComponent={Hero}>
    <SEO title="Home" />
    <div className="my-20"><Features/></div>
    {/*<div className="my-32"><Faqs /></div>*/}
    <div className="mt-20"><SignUp /></div>



  </Layout>
)

export default IndexPage
