// import { Link } from "gatsby"
import React from "react";
import { useForm, ValidationError } from "@formspree/react";
import { useStateValue } from "../utils/state";

const Hero = ({ children }) => {
  const [state, handleSubmit] = useForm("heroNotifyForm");
  const [{ theme }] = useStateValue();
  return (
    <div className="relative overflow-hidden">
      <div className="hidden sm:block sm:absolute sm:inset-y-0 sm:h-full sm:w-full">
        <div className="relative h-full max-w-screen-xl mx-auto">
          <svg
            className="absolute right-full transform translate-y-1/4 translate-x-1/4 lg:translate-x-1/2"
            width="404"
            height="784"
            fill="none"
            viewBox="0 0 404 784">
            <defs>
              <pattern
                id="f210dbf6-a58d-4871-961e-36d5016a0f49"
                x="0"
                y="0"
                width="20"
                height="20"
                patternUnits="userSpaceOnUse">
                <rect
                  x="0"
                  y="0"
                  width="4"
                  height="4"
                  className={theme.text.muted1}
                  fill="currentColor"
                />
              </pattern>
            </defs>
            <rect
              width="404"
              height="784"
              fill="url(#f210dbf6-a58d-4871-961e-36d5016a0f49)"
            />
          </svg>
          <svg
            className="absolute left-full transform -translate-y-3/4 -translate-x-1/4 md:-translate-y-1/2 lg:-translate-x-1/2"
            width="404"
            height="784"
            fill="none"
            viewBox="0 0 404 784">
            <defs>
              <pattern
                id="5d0dd344-b041-4d26-bec4-8d33ea57ec9b"
                x="0"
                y="0"
                width="20"
                height="20"
                patternUnits="userSpaceOnUse">
                <rect
                  x="0"
                  y="0"
                  width="4"
                  height="4"
                  className={theme.text.muted1}
                  fill="currentColor"
                />
              </pattern>
            </defs>
            <rect
              width="404"
              height="784"
              fill="url(#5d0dd344-b041-4d26-bec4-8d33ea57ec9b)"
            />
          </svg>
        </div>
      </div>

      <div className="relative pt-6 pb-12 sm:pb-16 md:pb-20 lg:pb-28 xl:pb-32">
        {children}

        <div className="mt-10 mx-auto max-w-screen-xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 xl:mt-28">
          <div className="text-center">
            <div
              className={`text-sm font-semibold uppercase tracking-wide ${theme.text.muted4} sm:text-lg lg:text-base xl:text-lg mb-6`}>
              Coming soon
            </div>
            <h2
              className={`text-4xl tracking-tight leading-10 font-hairline ${theme.text.normal} sm:text-5xl sm:leading-none md:text-6xl`}>
              <span className="line-through">Ding!</span>
              {` `}
              <span className="line-through">Boing!</span>
              {` `}
              <span className="line-through">Tada!</span>
              {` `}
              <br className="hidden md:inline" />
              <span
                className={`${theme.text.accent6} font-serif font-extrabold`}>
                Controlling your digital life?
              </span>
            </h2>
            <p
              className={`mt-3 max-w-md mx-auto text-base ${theme.text.muted4} sm:text-lg md:mt-5 md:text-xl md:max-w-3xl`}>
              <span className="font-bold">Take control</span> of your Slack
              notifications. <br /> Have them run to your schedule, not decide
              your schedule.
            </p>
            <div className="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
              {/*<div className="rounded-md shadow">
                <a href="#" className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base leading-6 font-medium rounded-md text-white bg-midnight-600 hover:bg-midnight-500 focus:outline-none focus:shadow-outline-midnight transition duration-150 ease-in-out md:py-4 md:text-lg md:px-10">
                  Get Notified
                </a>
              </div>*/}
              <div className="mt-5 sm:max-w-lg sm:mx-auto sm:text-center lg:text-left lg:mx-0">
                {state.succeeded ? (
                  <p className="mt-3 sm:flex">
                    Thanks for signing up! We will let you know when naptime is
                    ready.
                  </p>
                ) : (
                  <>
                    <p className={`text-base font-medium ${theme.text.normal}`}>
                      Sign up to get notified when it's ready.
                    </p>
                    <form onSubmit={handleSubmit} className="mt-3 sm:flex">
                      <input
                        aria-label="Email"
                        className={`${theme.bg.normal} appearance-none block w-full px-3 py-3 border border-gray-300 text-base leading-6 rounded-md ${theme.placeholder.normal} shadow-sm focus:outline-none focus:${theme.placeholder.focus} focus:shadow-outline focus:border-blue-300 transition duration-150 ease-in-out sm:flex-1`}
                        placeholder="Enter your email"
                        required
                        id="email"
                        type="email"
                        name="email"
                      />
                      <ValidationError
                        prefix="Email"
                        field="email"
                        errors={state.errors}
                      />
                      <button
                        type="submit"
                        className={`mt-3 w-full px-6 py-3 border border-transparent text-base leading-6 font-medium rounded-md ${theme.text.inverse} ${theme.bg.inverse} shadow-sm hover:${theme.bg.inverse1} focus:outline-none focus:shadow-outline active:${theme.bg.inverse0} transition duration-150 ease-in-out sm:mt-0 sm:ml-3 sm:flex-shrink-0 sm:inline-flex sm:items-center sm:w-auto`}
                        disabled={state.submitting}>
                        Notify me
                      </button>
                    </form>
                    <p
                      className={`mt-3 text-sm leading-5 ${theme.text.muted4}`}>
                      We care about the protection of your data. Read our{` `}
                      <a
                        href="/privacy"
                        className={`font-medium ${theme.text.normal} underline`}>
                        Privacy Policy
                      </a>
                      .
                    </p>
                  </>
                )}
              </div>
              {/*<div className="mt-3 rounded-md shadow sm:mt-0 sm:ml-3">
                <a href="#" className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base leading-6 font-medium rounded-md text-midnight-600 bg-white hover:text-midnight-500 focus:outline-none focus:shadow-outline-blue transition duration-150 ease-in-out md:py-4 md:text-lg md:px-10">
                  Live demo
                </a>
              </div>*/}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
