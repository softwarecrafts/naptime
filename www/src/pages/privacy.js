import React from "react";

import Layout from "../components/layout";
import SignUp from "../components/signup";
import SEO from "../components/seo";
import { useStateValue } from "../utils/state";


const PrivacyHero = ({ children }) => {
const [{ theme }] = useStateValue();
  return (
  <div className={`relative ${theme.bg.normal} overflow-hidden`}>
    <div className="relative pt-6 pb-4">
      {children}

      <div className="mt-10 mx-auto max-w-screen-xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 xl:mt-28">
        <div className="text-center">
          <h2 className={`text-4xl tracking-tight leading-10 font-extrabold font-serif ${theme.text.normal} sm:text-5xl sm:leading-none md:text-6xl`}>
            Privacy Policy
          </h2>
        </div>
      </div>
    </div>
  </div>
)};

const PrivacyPage = () => {
  const [{ theme }] = useStateValue();
  return (
  <Layout HeroComponent={PrivacyHero}>
    <SEO title="Privacy" />
    <div className={`relative ${theme.bg.normal} ${theme.text.normal} overflow-hidden`}>
      <div className="mt-10 mx-auto max-w-screen-xl px-4 sm:px-6 pb-12 sm:pb-16 md:pb-20 lg:pb-28 xl:pb-32">
        <div className="text-base mt-10 mx-32">
          <p className="mt-4">
            Your privacy is important to us. It is AKMiller Technologies
            Limited's policy to respect your privacy regarding any information
            we may collect from you across this website,{" "}
            <a className={`${theme.text.accent6} hover:no-underline underline`} href="https://naptime.app">https://naptime.app</a>, and other sites
            we own and operate.
          </p>
          <p className="mt-4">
            Our Sites include:
            <ol type="a" className="list-disc list-inside ml-8">
              <li className="my-1"><a className={`${theme.text.accent6} hover:no-underline underline`} href="https://softwarecrafts.uk">Software Crafts</a></li>
              <li className="my-1"><a className={`${theme.text.accent6} hover:no-underline underline`} href="https://naptime.app">naptime.app</a></li>
            </ol>
          </p>
          <h3 className="text-3xl mt-8">Information we collect</h3>
          <h4 className="text-2xl mt-4">Log data</h4>
          <p className="mt-4">
            When you visit our website, our servers may automatically log the
            standard data provided by your web browser. This data is considered
            "non-identifying information", as it does not personally identify
            you on its own. It may include your computer's Internet Protocol
            (IP) address, your browser type and version, the pages you visit,
            the time and date of your visit, the time spent on each page, and
            other details.
          </p>
          <h4 className="text-2xl mt-4">Personal information</h4>
          <p className="mt-4">
            We may ask for personal information, such as your name and email
            address. This data is considered "identifying information", as it
            can personally identify you. We only request personal information
            relevant to providing you with a service, and only use it to help
            provide or improve this service.
          </p>
          <h4 className="text-2xl mt-4">How we collect information</h4>
          <p className="mt-4">
            We collect information by fair and lawful means, with your knowledge
            and consent. We also let you know why we're collecting it and how it
            will be used. You are free to refuse our request for this
            information, with the understanding that we may be unable to provide
            you with some of your desired services without it.
          </p>
          <h3 className="text-3xl mt-8">Use of information</h3>
          <p className="mt-4">
            We may use a combination of identifying and non-identifying
            information to understand who our visitors are, how they use our
            services, and how we may improve their experience of our website in
            future. We do not disclose the specifics of this information
            publicly, but may share aggregated and anonymised versions of this
            information, for example, in website and customer usage trend
            reports.
          </p>
          <h3 className="text-3xl mt-8">Data processing and storage</h3>
          <p className="mt-4">
            We only retain personal information for as long as necessary to
            provide a service, or to improve our services in future. While we
            retain this data, we will protect it within commercially acceptable
            means to prevent loss and theft, as well as unauthorised access,
            disclosure, copying, use or modification. That said, we advise that
            no method of electronic transmission or storage is 100% secure, and
            cannot guarantee absolute data security.
          </p>
          <h3 className="text-3xl mt-8">Cookies</h3>
          <p className="mt-4">
            We use "cookies" to collect information about you and your activity
            across our site. A cookie is a small piece of data that our website
            stores on your computer, and accesses each time you visit so we can
            understand how you use our site and serve you content based on
            preferences you have specified.
          </p>
          <p className="mt-4">
            If you do not wish to accept cookies from us, you should instruct
            your browser to refuse cookies from our website, understanding that
            we may be unable to provide you with some of your desired services
            without them. This policy covers only the use of cookies between
            your computer and our website; it does not cover the use of cookies
            by any third-party services we use on our site.
          </p>
          <h3 className="text-3xl mt-8">Third-party access to information</h3>
          <p className="mt-4">
            We may use third-party services for our website and marketing
            activity. These services may access our data solely for the purpose
            of performing specific tasks on our behalf. We do not share any
            personally identifying information with these services without your
            explicit consent. We do not give these services permission to
            disclose or use any of our data for any other purpose.
          </p>
          <p className="mt-4">
            We will refuse government and law enforcement requests for data if
            we believe a request is too broad or unrelated to its stated
            purpose. However, we may cooperate if we believe the requested
            information is necessary and appropriate to comply with legal
            process, to protect our own rights and property, to protect the
            safety of the public and any person, to prevent a crime, or to
            prevent what we reasonably believe to be illegal, legally
            actionable, or unethical activity.
          </p>
          <p className="mt-4">
            We do not otherwise share or supply personal information to third
            parties. We do not sell or rent your personal information to
            marketers or third parties.
          </p>
          <h3 className="text-3xl mt-8">Children's Privacy</h3>
          <p className="mt-4">
            This website does not knowingly target or collect personal
            information from children. As a parent/guardian, please contact us
            if you believe your child is participating in an activity involving
            personal information on our website, and you have no received a
            notification or request for consent. We do not use your supplied
            contact details for marketing or promotional purposes.
          </p>
          <h3 className="text-3xl mt-8">Limits of our policy</h3>
          <p className="mt-4">
            This privacy policy only covers AKMiller Technologies Limited's own
            collecting and handling of data. We only work with partners,
            affiliates and third-party providers whose privacy policies align
            with ours, however we cannot accept responsibility or liability for
            their respective privacy practices.
          </p>
          <p className="mt-4">
            Our website may link to external sites that are not operated by us.
            Please be aware that we have no control over the content and
            policies of those sites, and cannot accept responsibility or
            liability for their respective privacy practices.
          </p>
          <h3 className="text-3xl mt-8">Changes to this policy</h3>
          <p className="mt-4">
            At our discretion, we may update this policy to reflect current
            acceptable practices. We will take reasonable steps to let users
            know about changes via our website. Your continued use of this site
            after any changes to this policy will be regarded as acceptance of
            our practices around data and personal information.
          </p>
          <h3 className="text-3xl mt-8">Your rights and responsibilities</h3>
          <p className="mt-4">
            As our user, you have the right to be informed about how your data
            is collected and used. You are entitled to know what data we collect
            about you, and how it is processed. You are entitled to correct and
            update any personal information about you, and to request this
            information be deleted.
          </p>
          <p className="mt-4">
            You are entitled to restrict or object to our use of your data,
            while retaining the right to use your personal information for your
            own purposes. You have the right to opt out of data about you being
            used in decisions based solely on automated processing.
          </p>
          <p className="mt-4">
            Feel free to contact us if you have any concerns or questions about
            how we handle your data and personal information.
          </p>
          <p className="mt-4">
            <strong>AKMiller Technologies Limited Data Controller</strong>
            <br />
            Andrew Miller
            <br />
            andy@naptime.app
          </p>
          <p className="mt-4">This policy is effective as of 1 April 2020.</p>
        </div>
      </div>
    </div>
    <div className="mt-20">
      <SignUp />
    </div>
  </Layout>
)};

export default PrivacyPage;
