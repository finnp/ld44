import React, {useState, useContext} from 'react'

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


  return <Context.Provider value={{
      resources,
      updateResource
    }}>
    {children}
  </Context.Provider>
}
