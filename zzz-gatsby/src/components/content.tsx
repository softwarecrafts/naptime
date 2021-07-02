import * as React from 'react'
import { PageProps } from 'gatsby'

const Content = (props: PageProps) => {
  return (
    <>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        {/* <!-- Replace with your content --> */}
        {props.children}
        {/* <!-- /End replace --> */}
      </div>
    </>
  )
}

export default Content
