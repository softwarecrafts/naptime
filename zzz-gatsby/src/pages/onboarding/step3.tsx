import React, { FC, useState } from 'react'
import { PageProps, navigate } from 'gatsby'
import moment from 'moment'

import OnboardingShell from '../../components/shells/onboarding'
import { initialNaps, napReducer, NapProvider, useNapContext } from '../../components/logic/napProvider'

const Step3Form: FC<PageProps> = () => {
  const [{ naps }, dispatch] = useNapContext()
  const [status, setStatus] = useState()
  console.log(naps)

  const onSubmit = (event: any) => {
    event.preventDefault()
    dispatch({
      type: `updateNap`,
      napId: 0,
      newNap: {
        status: status,
      },
    })
    dispatch({
      type: `scheduleNap`,
      napId: 0,
    })
    navigate(`/`)
  }
  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div>
        <label htmlFor="status" className="block text-sm font-medium leading-5 text-gray-700">
          Status
        </label>
        <div className="mt-1 rounded-md shadow-sm">
          <input
            id="status"
            type="text"
            onChange={(e) => setStatus(e.target.value)}
            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
          />
        </div>
      </div>

      <div className="mt-6">
        <span className="block w-full rounded-md shadow-sm">
          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition duration-150 ease-in-out"
          >
            Next
          </button>
        </span>
      </div>
    </form>
  )
}

const Step3Content: FC<PageProps> = () => {
  return (
    <NapProvider initialState={initialNaps} reducer={napReducer}>
      <div className="mt-6">
        <Step3Form />
      </div>
    </NapProvider>
  )
}

const Step3: FC<PageProps> = () => {
  return (
    <OnboardingShell
      sidebar={<Step3Content />}
      image={`https://images.unsplash.com/photo-1505904267569-f02eaeb45a4c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1908&q=80`}
      title={`Schedule your first naptime`}
      subtitle={<p className="mt-2 text-sm leading-5 text-gray-600 max-w">Set an optional status message</p>}
    />
  )
}

export default Step3
