import React, {useState, useContext} from 'react'
import useInterval from 'react-useinterval'
import {random} from 'lodash'

const Context = React.createContext()

export default function useStore() {
  return useContext(Context)
}

export const END_OF_DAY = 390
const MINUTE_LENGTH = 400
const INITIAL_HIRE_COST = 100
const HIRE_COST_INCREMENT = 100


export function Store ({children}) {
  const [day, setDay] = useState(1)

  const [money, setMoney] = useState(0)

  const [time, setTime] = useState(0)

  const [workers, setWorkers] = useState([createWorker(100)])

  const [hireCost, setHireCost] = useState(INITIAL_HIRE_COST)


  function tick() {
    if (time >= END_OF_DAY) {
      endDay()
    } else {
      setTime(time + 1)
      setWorkers(workers.map(worker => (
        {...worker, amount: worker.amount + random(1,5)}
      )))
    }
  }

  function endDay() {
    setTime(0)
    setDay(day + 1)
  }

  function createWorker(initialAmount) {
    return {
      amount: initialAmount || 0
    }
  }

  useInterval(tick, MINUTE_LENGTH)

  function collect(index) {
    setMoney(money + workers[index].amount)
    setWorkers(workers.map((worker, i) => (
      {...worker, amount: index === i ? 0 : worker.amount}
    )))
  }

  function hire() {
    if (money >= hireCost) {
      setMoney(money - hireCost)
      setWorkers([...workers, createWorker()])
      setHireCost(hireCost + HIRE_COST_INCREMENT)
    }
  }


  return <Context.Provider value={{
      time,
      day,
      money,
      workers,
      collect,
      hire,
      hireCost
    }}>
    {children}
  </Context.Provider>
}
