import React, {useState, useContext} from 'react'
import useInterval from 'react-useinterval'
import {mapValues} from 'lodash'

const Context = React.createContext()

export default function useStore() {
  return useContext(Context)
}

export const END_OF_DAY = 50// 390
const MINUTE_LENGTH = 1000

export function Store ({children}) {
  const [currencies, setCurrencies] = useState({
    EUR: 900,
    USD: 1000
  })

  function randomChangeCurrencies () {
    setCurrencies(mapValues(currencies, value => 0.8 * value + 0.2 * (2 * Math.random() - 1) * value))
  }


  const [day, setDay] = useState(1)

  const [resources, setResources] = useState({
    USD: 900,
    EUR: 1000
  })


  function updateResources (changedResources) {
    setResources({
      ...resources,
      ...changedResources
    })
  }

  const [time, setTime] = useState(0)

  function incrementTime () {
    setTime(time + 1)
    randomChangeCurrencies()
    if (time > END_OF_DAY) {
      setStock([])
      setTime(0)
      setDay(day + 1)
    } else {
      console.log(currencies)
      addStock({time: time, '€/$': currencies['EUR'] / currencies['USD']})
    }
  }

  useInterval(incrementTime, MINUTE_LENGTH)

  const [stock, setStock] = useState([])

  function addStock (datapoint) {
    setStock([...stock, datapoint])
  }

  const [orders, setOrders] = useState([
    {
      id: 1,
      type: 'buy',
      from: {
        currency: 'USD',
        amount: 1000
      },
      to: {
        currency: 'EUR',
        amount: 700
      }
    },
    {
      id: 2,
      type: 'sell',
      from: {
        currency: 'EUR',
        amount: 1100
      },
      to: {
        currency: 'USD',
        amount: 900
      }
    }
  ])

  function acceptOrder ({id, from, to, type}) {
    const direction = type === 'buy' ? 1 : -1
    updateResources({
      [from.currency]: resources[from.currency] - direction * from.amount,
      [to.currency]: resources[to.currency] + direction * to.amount
    })
    setOrders(orders.filter(order => order.id !== id))
  }

  return <Context.Provider value={{
      resources,
      time,
      stock,
      day,
      orders,
      acceptOrder
    }}>
    {children}
  </Context.Provider>
}
