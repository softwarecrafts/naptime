import * as React from 'react'
import AppShell from '../components/layout'

const App: React.FC<PageProps> = () => (
  <AppShell>
    <div className="py-4">
      <div className="border-4 border-dashed border-gray-200 rounded-lg h-96">
        Hello world!
      </div>
    </div>
  </AppShell>
)

export default App
