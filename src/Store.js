import React, {useState, useContext} from 'react'
import useInterval from 'react-useinterval'

const Context = React.createContext()

export default function useStore() {
  return useContext(Context)
}

export const END_OF_DAY = 50// 390
const MINUTE_LENGTH = 1000

export function Store ({children}) {
  const [day, setDay] = useState(1)

  const [resources, setResources] = useState({
    USD: 5000,
    EUR: 10000
  })


  function updateResources (changedResources) {
    setResources({
      ...resources,
      ...changedResources
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
