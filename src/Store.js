import React, {useState, useContext} from 'react'
import useInterval from 'react-useinterval'

const Context = React.createContext()

export default function useStore() {
  return useContext(Context)
}

export function Store ({children}) {
  const [resources, setResources] = useState({
    USD: 5000,
    EUR: 10000,
    GBP: 2
  })

  function updateResource (currency, amount) {
    setResources({
      currency: amount,
      ...resources
    })
  }

  const [time, setTime] = useState(0)

  function incrementTime () {
    setTime(time + 1)
  }

  useInterval(incrementTime, 1000)

  return <Context.Provider value={{
      resources,
      updateResource,
      time
    }}>
    {children}
  </Context.Provider>
}
