import * as React from 'react'
import { PageProps } from 'gatsby'
import AppShell from '../components/layout'
import useSWR from 'swr'

const fetcher = (...args) => fetch(...args).then((res) => res.json())

const App: React.FC<PageProps> = () => {
  const { data, error } = useSWR(`/.netlify/functions/api/auth/status`, fetcher)

  const clickHandler = () => {
    console.log(`CLICKED`)
    console.log(data, error)
  }
  return (
    <AppShell>
      <div className="py-4">
        <div className="border-4 border-dashed border-gray-200 rounded-lg h-96">
          Hello world!
          <button className="px-4 py-2 border" onClick={clickHandler}>
            Click me
          </button>
        </div>
      </div>
    </AppShell>
  )
}

export default App
