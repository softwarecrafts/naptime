import React from "react";

import Layout from "../components/layout";
import SignUp from "../components/signup";
import SEO from "../components/seo";

const CookiesHero = ({ children }) => (
  <div className="relative bg-gray-50 overflow-hidden">
    <div className="relative pt-6 pb-4">
      {children}

      <div className="mt-10 mx-auto max-w-screen-xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 xl:mt-28">
        <div className="text-center">
          <h2 className="text-4xl tracking-tight leading-10 font-extrabold font-serif text-gray-900 sm:text-5xl sm:leading-none md:text-6xl">
            Cookie Policy
          </h2>
        </div>
      </div>
    </div>
  </div>
);

const CookiesPage = () => (
  <Layout HeroComponent={CookiesHero}>
    <SEO title="Cookies" />
    <div className="relative bg-gray-50 overflow-hidden">
      <div className="mt-10 mx-auto max-w-screen-xl px-4 sm:px-6 pb-12 sm:pb-16 md:pb-20 lg:pb-28 xl:pb-32">
        <div className="text-base mt-10 mx-32">
          <p className="mt-4">
            We use cookies to help improve your experience of{" "}
            <a className="text-midnight-400 hover:underline" href="http://naptime.app">http://naptime.app</a>. This cookie
            policy is part of AKMiller Technologies Limited's privacy policy,
            and covers the use of cookies between your device and our site.
          </p>
          <p className="mt-4">
            If you don't wish to accept cookies from us, you should instruct
            your browser to refuse cookies from{" "}
            <a className="text-midnight-400 hover:underline" href="http://naptime.app">http://naptime.app</a>, with the
            understanding that we may be unable to provide you with some of your
            desired content and services.
          </p>
          <h3 className="text-3xl mt-8">What is a cookie?</h3>
          <p className="mt-4">
            A cookie is a small piece of data that a website stores on your
            device when you visit, typically containing information about the
            website itself, a unique identifier that allows the site to
            recognise your web browser when you return, additional data that
            serves the purpose of the cookie, and the lifespan of the cookie
            itself.
          </p>
          <p className="mt-4">
            Cookies are used to enable certain features (eg. logging in), to
            track site usage (eg. analytics), to store your user settings (eg.
            timezone, notification preferences), and to personalise your content
            (eg. advertising, language).
          </p>
          <p className="mt-4">
            Cookies set by the website you are visiting are normally referred to
            as "first-party cookies", and typically only track your activity on
            that particular site. Cookies set by other sites and companies (ie.
            third parties) are called "third-party cookies", and can be used to
            track you on other websites that use the same third-party service.
          </p>
          <h3 className="text-3xl mt-8">
            How you can control or opt out of cookies
          </h3>
          <p className="mt-4">
            If you do not wish to accept cookies from us, you can instruct your
            browser to refuse cookies from our website. Most browsers are
            configured to accept cookies by default, but you can update these
            settings to either refuse cookies altogether, or to notify you when
            a website is trying to set or update a cookie.
          </p>
          <p className="mt-4">
            If you browse websites from multiple devices, you may need to update
            your settings on each individual device.
          </p>
          <p className="mt-4">
            Although some cookies can be blocked with little impact on your
            experience of a website, blocking all cookies may mean you are
            unable to access certain features and content across the sites you
            visit.
          </p>
        </div>
      </div>
    </div>
    <div className="mt-20">
      <SignUp />
    </div>
  </Layout>
);

export default CookiesPage;
