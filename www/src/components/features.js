// import { Link } from "gatsby"
import React from "react"

const Features = () => (

    <div id="features" className="py-12 bg-gray-50">
      <div className="max-w-xl mx-auto px-4 sm:px-6 lg:max-w-screen-xl lg:px-8">
      <div className="lg:text-center">
        <h3 className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl sm:leading-10">
          Control your notification schedule
        </h3>
      </div>
        <div className="lg:grid lg:grid-cols-3 lg:gap-8 mt-16">
          <div>
            <div className="flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
                <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
                </svg>
            </div>
            <div className="mt-5">
              <h5 className="text-lg leading-6 font-medium text-gray-900">Get deep work done.</h5>
              <p className="mt-2 text-base leading-6 text-gray-500">
                Make your weekly schedule actionable by having naptime automatically turn off slack notifications based on your calendar.
              </p>
            </div>
          </div>
          <div className="mt-10 lg:mt-0">
            <div className="flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
              <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3"/>
              </svg>
            </div>
            <div className="mt-5">
              <h5 className="text-lg leading-6 font-medium text-gray-900">Reclaim your weekend</h5>
              <p className="mt-2 text-base leading-6 text-gray-500">
                Use the simple pre-defined time slots to ensure your work doesn't intrude on your time off.
              </p>
            </div>
          </div>
          <div className="mt-10 lg:mt-0">
            <div className="flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
                <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"/>
                </svg>
            </div>
            <div className="mt-5">
              <h5 className="text-lg leading-6 font-medium text-gray-900">No Mobile notifications</h5>
              <p className="mt-2 text-base leading-6 text-gray-500">
                No push notifications, no emails, no video calls, nothing, nada, zilch, diddly-squat.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
)

export default Features;
