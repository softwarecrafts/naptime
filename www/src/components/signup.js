// import { Link } from "gatsby";
// import PropTypes from "prop-types";
import React from "react";
import { useForm, ValidationError } from "@formspree/react";
import { useStateValue } from "../utils/state";

const SignUp = () => {
  const [state, handleSubmit] = useForm("newsletterNotifyForm");
  const [{ theme }] = useStateValue();

  return (
    <div id="signup" className={theme.bg.inverse}>
      <div className="max-w-screen-xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center">
        <div className="lg:w-0 lg:flex-1">
          <h2
            className={`text-3xl leading-9 font-extrabold tracking-tight ${theme.text.inverse} sm:text-4xl sm:leading-10`}>
            Sign up to get notified when it's ready.
          </h2>
          <p
            className={`mt-3 max-w-3xl text-lg leading-6 ${theme.text.muted2}`}>
            No spam, only the occasional email to help shape the product and
            when naptime is ready.
          </p>
        </div>
        <div className="mt-8 lg:mt-0 lg:ml-8">
          {state.succeeded ? (
            <p className={`sm:flex ${theme.text.inverse}`}>
              Thanks for signing up! We will let you know when naptime is ready.
            </p>
          ) : (
            <>
              <form onSubmit={handleSubmit} className="sm:flex">
                <input
                  aria-label="Email address"
                  type="email"
                  required
                  className={`appearance-none w-full px-5 py-3 border border-transparent text-base leading-6 rounded-md ${theme.text.normal} ${theme.bg.normal} ${theme.placeholder.normal} focus:outline-none focus:${theme.placeholder.focus} transition duration-150 ease-in-out sm:max-w-xs`}
                  placeholder="Enter your email"
                  id="email"
                  name="email"
                />
                <ValidationError
                  prefix="Email"
                  field="email"
                  errors={state.errors}
                />
                <div className="mt-3 rounded-md shadow sm:mt-0 sm:ml-3 sm:flex-shrink-0">
                  <button
                    type="submit"
                    className={`w-full flex items-center justify-center px-5 py-3 border border-transparent text-base leading-6 font-medium rounded-md text-white ${theme.bg.accent3} hover:${theme.bg.accent2} focus:outline-none focus:${theme.bg.accent2} transition duration-150 ease-in-out`}
                    disabled={state.submitting}>
                    Notify me
                  </button>
                </div>
              </form>
              <p className={`mt-3 text-sm leading-5 ${theme.text.muted2}`}>
                We care about the protection of your data. Read our{` `}
                <a
                  href="/privacy"
                  className={`${theme.text.inverse} font-medium underline`}>
                  Privacy Policy.
                </a>
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default SignUp;
