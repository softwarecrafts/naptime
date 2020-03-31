import React from "react"

import Layout from "../components/layout"
import SignUp from '../components/signup'
import SEO from "../components/seo"

const PrivacyHero = ({ children }) => (
    <div className="relative bg-gray-50 overflow-hidden">


      <div className="relative pt-6 pb-4">
        {children}

        <div className="mt-10 mx-auto max-w-screen-xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 xl:mt-28">
          <div className="text-center">
            <h2 className="text-4xl tracking-tight leading-10 font-extrabold font-serif text-gray-900 sm:text-5xl sm:leading-none md:text-6xl">
              Privacy Policy
            </h2>
          </div>
        </div>
      </div>
    </div>

)

const PrivacyPage = () => (
  <Layout HeroComponent={PrivacyHero}>
    <SEO title="Privacy" />
    <div className="relative bg-gray-50 overflow-hidden">
        <div className="mt-10 mx-auto max-w-screen-xl px-4 sm:px-6 pb-12 sm:pb-16 md:pb-20 lg:pb-28 xl:pb-32">
          <div className="text-base mt-10">
            <p>
            Text goes here

            </p>
          </div>

        </div>

    </div>
    <div className="mt-20"><SignUp /></div>
  </Layout>
)

export default PrivacyPage
