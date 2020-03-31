// import { Link } from "gatsby";
// import PropTypes from "prop-types";
import React from "react";
import { useForm, ValidationError } from '@statickit/react';

const SignUp = ({ siteTitle }) => {
    const [state, handleSubmit] = useForm("newsletterNotifyForm");

    return (
  <div id="signup" className="bg-gray-800">
    <div className="max-w-screen-xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center">
      <div className="lg:w-0 lg:flex-1">
        <h2 className="text-3xl leading-9 font-extrabold tracking-tight text-white sm:text-4xl sm:leading-10">
          Sign up to get notified when it's ready.
        </h2>
        <p className="mt-3 max-w-3xl text-lg leading-6 text-gray-300">
          No spam, only the occasional email to help shape the product and when naptime is ready.
        </p>
      </div>
      <div className="mt-8 lg:mt-0 lg:ml-8">
       {state.succeeded ? <p className="sm:flex text-white">Thanks for signing up! We will let you know when naptime is ready.</p> : <>
        <form onSubmit={handleSubmit} className="sm:flex">
          <input
            aria-label="Email address"
            type="email"
            required
            className="appearance-none w-full px-5 py-3 border border-transparent text-base leading-6 rounded-md text-gray-900 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 transition duration-150 ease-in-out sm:max-w-xs"
            placeholder="Enter your email"
            id="email"
            type="email"
            name="email"
          />
          <ValidationError
            prefix="Email"
            field="email"
            errors={state.errors}
          />
          <div className="mt-3 rounded-md shadow sm:mt-0 sm:ml-3 sm:flex-shrink-0">
            <button type="submit" className="w-full flex items-center justify-center px-5 py-3 border border-transparent text-base leading-6 font-medium rounded-md text-white bg-indigo-500 hover:bg-indigo-400 focus:outline-none focus:bg-indigo-400 transition duration-150 ease-in-out" disabled={state.submitting}>
              Notify me
            </button>
          </div>
        </form>
        <p className="mt-3 text-sm leading-5 text-gray-300">
          We care about the protection of your data. Read our{` `}
          <a href="/privacy" className="text-white font-medium underline">
            Privacy Policy.
          </a>
        </p></>}
      </div>
    </div>
  </div>
)};

export default SignUp;
