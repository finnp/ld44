import React, {useState, useContext} from 'react'
import useInterval from 'react-useinterval'
import {mapValues, sampleSize, random} from 'lodash'

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
    USD: 1800,
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
    updateOrders()
    if (time > END_OF_DAY) {
      setStock([])
      setTime(0)
      setDay(day + 1)
    } else {
      addStock({time: time, '€/$': currencies['EUR'] / currencies['USD']})
    }
  }

  useInterval(incrementTime, MINUTE_LENGTH)

  const [stock, setStock] = useState([])

  function addStock (datapoint) {
    setStock([...stock, datapoint])
  }

  const [orders, setOrders] = useState([])
  function updateOrders () {

    const newOrders = orders.length < 5 && Math.random() > 0.8 ? [createNewOrder()]: []

    const updatedOrders = orders
      .map(order => ({...order, timer: order.timer - 1}))
      .filter(order => order.timer > 0)

    setOrders([...updatedOrders, ...newOrders])
  }

  function createNewOrder () {
    const [fromCurrency, toCurrency] = sampleSize(Object.keys(currencies), 2)
    const type = Math.random() > 0.5 ? 'buy' : 'sell'

    const rate = currencies[fromCurrency] /  currencies[toCurrency]

    const fromAmount = random(1, 50) * 100

    const toAmount = Math.round(type === 'buy' ? fromAmount * rate : fromAmount / rate)

    return {
      id: Math.random(),
      timer: 20,
      type,
      from: {
        currency: fromCurrency,
        amount: fromAmount
      },
      to: {
        currency: toCurrency,
        amount: toAmount
      }
    }
  }


  function acceptOrder ({id, from, to, type}) {
    const direction = type === 'buy' ? 1 : -1

    const updatedResources = {
      [from.currency]: resources[from.currency] - direction * from.amount,
      [to.currency]: resources[to.currency] + direction * to.amount
    }

    if (Object.values(updatedResources).every(amount => amount > 0)) {
      updateResources(updatedResources)
      setOrders(orders.filter(order => order.id !== id))
    }

  }

  return <Context.Provider value={{
      resources,
      time,
      stock,
      day,
      orders,
      acceptOrder,
      currencies
    }}>
    {children}
  </Context.Provider>
}
