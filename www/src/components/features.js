// import { Link } from "gatsby"
import React from "react"
import { useStateValue } from "../utils/state";

const Features = () => {
    const [{ theme }] = useStateValue();
    return (
    <div id="features" className="py-12">
      <div className="max-w-xl mx-auto px-4 sm:px-6 lg:max-w-screen-xl lg:px-8">
      <div className="lg:text-center">
        <h3 className={`mt-2 text-3xl leading-8 font-extrabold tracking-tight ${theme.text.normal} sm:text-4xl sm:leading-10`}>
          Control your notification schedule
        </h3>
      </div>
        <div className="lg:grid lg:grid-cols-3 lg:gap-8 mt-16">
          <div>
            <div className={`flex items-center justify-center h-12 w-12 rounded-md ${theme.bg.accent1} ${theme.text.inverse}`}>

                <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" className="w-8 h-8"><path d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path></svg>
            </div>
            <div className="mt-5">
              <h5 className={`text-lg leading-6 font-medium ${theme.text.normal}`}>Get deep work done.</h5>
              <p className={`mt-2 text-base leading-6 ${theme.text.muted4}`}>
                Make your weekly schedule actionable by having naptime automatically turn off slack notifications based on your calendar.
              </p>
            </div>
          </div>
          <div className="mt-10 lg:mt-0">
            <div className={`flex items-center justify-center h-12 w-12 rounded-md ${theme.bg.accent1} ${theme.text.inverse}`}>
              <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" className="w-8 h-8"><path d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
            </div>
            <div className="mt-5">
              <h5 className={`text-lg leading-6 font-medium ${theme.text.normal}`}>Reclaim your weekend</h5>
              <p className={`mt-2 text-base leading-6 ${theme.text.muted4}`}>
                Use the simple pre-defined time slots to ensure your work doesn't intrude on your time off.
              </p>
            </div>
          </div>
          <div className="mt-10 lg:mt-0">
            <div className={`flex items-center justify-center h-12 w-12 rounded-md ${theme.bg.accent1} ${theme.text.inverse}`}>
                <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" className="w-8 h-8"><path d="M8 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"></path></svg>
            </div>
            <div className="mt-5">
              <h5 className={`text-lg leading-6 font-medium ${theme.text.normal}`}>No Mobile notifications</h5>
              <p className={`mt-2 text-base leading-6 ${theme.text.muted4}`}>
                No push notifications, no emails, no video calls, nothing, nada, zilch, diddly-squat.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
)}

export default Features;
