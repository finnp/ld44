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
    addStock({time: time, '€/$': 0.8 * stock[stock.length - 1]['€/$'] + 0.2 * Math.random()})
  }

  useInterval(incrementTime, 1000)

  const [stock, setStock] = useState([
    {time: '0:00', '€/$': 0.32},
  ])

  function addStock (datapoint) {
    console.log(datapoint)
    setStock([...stock, datapoint])
  }

  return <Context.Provider value={{
      resources,
      updateResource,
      time,
      stock
    }}>
    {children}
  </Context.Provider>
}
