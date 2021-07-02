import React, { createContext, useContext, useReducer, ContextType } from 'react'
import { Moment } from 'moment'
import useSWR, { mutate } from 'swr'

interface Nap {
  id: number
  start: Moment
  end: Moment
  status?: string
}

interface NapState {
  [id: number]: Nap
}

const fetcher = (...args: any[]) => fetch(...args).then((res) => res.json())

// const defaultNap = {
//   id: 0,
//   start: ``,
//   end: ``,
//   status: `I am having naptime`,
// }

const localStorageKey = `naps`
const defaultState = {}
const getInitialState = (): NapState => {
  if (typeof window !== `undefined`) {
    const storedState = JSON.parse(window.localStorage.getItem(localStorageKey))
    if (storedState === null) {
      return defaultState
    }
    return storedState
  }
  return defaultState
}

export function createCtx<ContextType>() {
  const ctx = createContext<ContextType | undefined>(undefined)
  function useCtx() {
    const c = useContext(ctx)
    if (!c) throw new Error(`useCtx must be inside a Provider with a value`)
    return c
  }
  return [useCtx, ctx.Provider] as const
}

export const initialNaps = getInitialState()

// export const NapContext = createContext<ContextType | undefined>(undefined!)
// export const useNapContext = (): ContextType => useContext(NapContext)

export const [useNapContext, NapContextProvider] = createCtx<ContextType>()

export const NapProvider = ({ reducer, initialState, children }) => (
  <NapContextProvider value={useReducer(reducer, initialState)}>{children}</NapContextProvider>
)

export const napReducer = (state: NapState, action: { type: string; newNap: Nap; napId: number }): NapState => {
  console.group(`napReducer`)
  console.log(state, action)
  console.groupEnd()
  switch (action.type) {
    case `createNap`:
      let newState = {
        ...state,
        [action.newNap.id]: action.newNap,
      }
      if (typeof window !== `undefined`) {
        window.localStorage.setItem(localStorageKey, JSON.stringify(newState))
      }
      return newState
    case `updateNap`:
      const napToUpdate = state[action.napId]
      newState = {
        ...state,
        [action.napId]: { ...napToUpdate, ...action.newNap },
      }
      if (typeof window !== `undefined`) {
        window.localStorage.setItem(localStorageKey, JSON.stringify(newState))
      }
      return newState
    case `scheduleNap`:
      const napToSchedule = state[action.napId]

      fetch(`/.netlify/functions/createNap`, {
        method: `POST`,
        mode: `cors`, // no-cors, *cors, same-origin
        cache: `no-cache`, // *default, no-cache, reload, force-cache, only-if-cached
        credentials: `same-origin`, // include, *same-origin, omit
        headers: {
          'Content-Type': `application/json`,
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: `follow`, // manual, *follow, error
        referrerPolicy: `no-referrer`, // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        body: JSON.stringify(napToSchedule), // body data type must match "Content-Type" header
      }).then((response) => response.json())
    default:
      return state
  }
}
