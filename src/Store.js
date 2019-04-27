import React, {useState, useContext} from 'react'
import useInterval from 'react-useinterval'

const Context = React.createContext()

export default function useStore() {
  return useContext(Context)
}

export const END_OF_DAY = 50// 390
const MINUTE_LENGTH = 100

export function Store ({children}) {
  const [day, setDay] = useState(1)

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
    // 390
    setTime(time + 1)
    if (time > END_OF_DAY) {
      setStock([{time: 0, '€/$': 0.32}])
      setTime(0)
      setDay(day + 1)
    } else {
      addStock({time: time, '€/$': 0.8 * stock[stock.length - 1]['€/$'] + 0.2 * Math.random()})
    }
  }

  useInterval(incrementTime, MINUTE_LENGTH)

  const [stock, setStock] = useState([
    {time: 0, '€/$': 0.32},
  ])

  function addStock (datapoint) {
    console.log(datapoint)
    setStock([...stock, datapoint])
  }

  return <Context.Provider value={{
      resources,
      updateResource,
      time,
      stock,
      day
    }}>
    {children}
  </Context.Provider>
}
