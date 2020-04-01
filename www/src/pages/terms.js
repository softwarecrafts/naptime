import React from "react";

import Layout from "../components/layout";
import SignUp from "../components/signup";
import SEO from "../components/seo";

const TermsHero = ({ children }) => (
  <div className="relative bg-gray-50 overflow-hidden">
    <div className="relative pt-6 pb-4">
      {children}

      <div className="mt-10 mx-auto max-w-screen-xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 xl:mt-28">
        <div className="text-center">
          <h2 className="text-4xl tracking-tight leading-10 font-extrabold font-serif text-gray-900 sm:text-5xl sm:leading-none md:text-6xl">
            Terms &amp; Conditions
          </h2>
        </div>
      </div>
    </div>
  </div>
);

const TermsPage = () => (
  <Layout HeroComponent={TermsHero}>
    <SEO title="Terms" />
    <div className="relative bg-gray-50 overflow-hidden">
      <div className="mt-10 mx-auto max-w-screen-xl px-4 sm:px-6 pb-12 sm:pb-16 md:pb-20 lg:pb-28 xl:pb-32">
        <div className="text-base mt-10 mx-32">
          <h3 className="text-3xl mt-8">1. Terms</h3>
          <p className="mt-4">
            By accessing the website at{" "}
            <a className="text-midnight-400 hover:underline" href="http://naptime.app">http://naptime.app</a>, you are
            agreeing to be bound by these terms of service, all applicable laws
            and regulations, and agree that you are responsible for compliance
            with any applicable local laws. If you do not agree with any of
            these terms, you are prohibited from using or accessing this site.
            The materials contained in this website are protected by applicable
            copyright and trademark law.
          </p>
          <h3 className="text-3xl mt-8">2. Use Licence</h3>
          <ol type="a" className="list-disc list-inside">
            <li className="my-1">
              Permission is granted to temporarily download one copy of the
              materials (information or software) on AKMiller Technologies
              Limited's website for personal, non-commercial transitory viewing
              only. This is the grant of a licence, not a transfer of title, and
              under this licence you may not:
              <ol type="i" className="list-disc list-inside ml-8">
                <li className="my-1">modify or copy the materials;</li>
                <li className="my-1">
                  use the materials for any commercial purpose, or for any
                  public display (commercial or non-commercial);
                </li>
                <li className="my-1">
                  attempt to decompile or reverse engineer any software
                  contained on AKMiller Technologies Limited's website;
                </li>
                <li className="my-1">
                  remove any copyright or other proprietary notations from the
                  materials; or
                </li>
                <li className="my-1">
                  transfer the materials to another person or "mirror" the
                  materials on any other server.
                </li>
              </ol>
            </li>
            <li className="my-1">
              This licence shall automatically terminate if you violate any of
              these restrictions and may be terminated by AKMiller Technologies
              Limited at any time. Upon terminating your viewing of these
              materials or upon the termination of this licence, you must
              destroy any downloaded materials in your possession whether in
              electronic or printed format.
            </li>
          </ol>
          <h3 className="text-3xl mt-8">3. Disclaimer</h3>
          <ol type="a" className="list-disc list-inside">
            <li className="my-1">
              The materials on AKMiller Technologies Limited's website are
              provided on an 'as is' basis. AKMiller Technologies Limited makes
              no warranties, expressed or implied, and hereby disclaims and
              negates all other warranties including, without limitation,
              implied warranties or conditions of merchantability, fitness for a
              particular purpose, or non-infringement of intellectual property
              or other violation of rights.
            </li>
            <li className="my-1">
              Further, AKMiller Technologies Limited does not warrant or make
              any representations concerning the accuracy, likely results, or
              reliability of the use of the materials on its website or
              otherwise relating to such materials or on any sites linked to
              this site.
            </li>
          </ol>
          <h3 className="text-3xl mt-8">4. Limitations</h3>
          <p className="mt-4">
            In no event shall AKMiller Technologies Limited or its suppliers be
            liable for any damages (including, without limitation, damages for
            loss of data or profit, or due to business interruption) arising out
            of the use or inability to use the materials on AKMiller
            Technologies Limited's website, even if AKMiller Technologies
            Limited or a AKMiller Technologies Limited authorised representative
            has been notified orally or in writing of the possibility of such
            damage. Because some jurisdictions do not allow limitations on
            implied warranties, or limitations of liability for consequential or
            incidental damages, these limitations may not apply to you.
          </p>
          <h3 className="text-3xl mt-8">5. Accuracy of materials</h3>
          <p className="mt-4">
            The materials appearing on AKMiller Technologies Limited's website
            could include technical, typographical, or photographic errors.
            AKMiller Technologies Limited does not warrant that any of the
            materials on its website are accurate, complete or current. AKMiller
            Technologies Limited may make changes to the materials contained on
            its website at any time without notice. However AKMiller
            Technologies Limited does not make any commitment to update the
            materials.
          </p>
          <h3 className="text-3xl mt-8">6. Links</h3>
          <p className="mt-4">
            AKMiller Technologies Limited has not reviewed all of the sites
            linked to its website and is not responsible for the contents of any
            such linked site. The inclusion of any link does not imply
            endorsement by AKMiller Technologies Limited of the site. Use of any
            such linked website is at the user's own risk.
          </p>
          <h3 className="text-3xl mt-8">7. Modifications</h3>
          <p className="mt-4">
            AKMiller Technologies Limited may revise these terms of service for
            its website at any time without notice. By using this website you
            are agreeing to be bound by the then current version of these terms
            of service.
          </p>
          <h3 className="text-3xl mt-8">8. Governing Law</h3>
          <p className="mt-4">
            These terms and conditions are governed by and construed in
            accordance with the laws of Cambridge and you irrevocably submit to
            the exclusive jurisdiction of the courts in that State or location.
          </p>
        </div>
      </div>
    </div>
    <div className="mt-20">
      <SignUp />
    </div>
  </Layout>
);

export default TermsPage;
