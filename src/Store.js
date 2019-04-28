import React, {useState, useContext} from 'react'
import useInterval from 'react-useinterval'
import {random} from 'lodash'

const Context = React.createContext()

export default function useStore() {
  return useContext(Context)
}

export const END_OF_DAY = 390
const MINUTE_LENGTH = 400
const INITIAL_HIRE_COST = 10
const HIRE_COST_INCREMENT = INITIAL_HIRE_COST
const BROKERS_PER_MANAGER = 5
const INITIAL_HIRE_MANAGER_COST = BROKERS_PER_MANAGER * INITIAL_HIRE_COST
const HIRE_MANAGER_COST_INCREMENT = BROKERS_PER_MANAGER * HIRE_COST_INCREMENT
const WORKER_SKILL = BROKERS_PER_MANAGER
const MANAGER_SKILL = BROKERS_PER_MANAGER * WORKER_SKILL


export function Store ({children}) {
  const [day, setDay] = useState(1)

  const [money, setMoney] = useState(0)

  const [time, setTime] = useState(0)

  const [workers, setWorkers] = useState([createWorker(100)])

  const [hireCost, setHireCost] = useState(INITIAL_HIRE_COST)

  const [hireManagerCost, setHireManagerCost] = useState(INITIAL_HIRE_MANAGER_COST)
  


  function tick() {
    if (time >= END_OF_DAY) {
      endDay()
    } else {
      setTime(time + 1)
      setWorkers(workers.map(worker => (
        {...worker, amount: worker.amount + random(1, worker.skill)}
      )))
    }
  }

  function endDay() {
    setTime(0)
    setDay(day + 1)
  }

  function createWorker(initialAmount) {
    return {
      id: Math.random(),
      type: 'broker',
      amount: initialAmount || 0,
      skill: WORKER_SKILL
    }
  }

  function createManager(initialAmount) {
    return {
      id: Math.random(),
      type: 'manager',      
      amount: initialAmount || 0,
      skill: MANAGER_SKILL
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

  function hireManager() {
    if (canHireManager()) {
      setMoney(money - hireManagerCost)
      const managedBrokers = workers.filter(it => it.type === 'broker').slice(0,5)
      setWorkers(
        [
          ...workers.filter(it => !managedBrokers.find(broker => broker.id === it.id)),
          createManager(managedBrokers.reduce((acc, curr) => acc + curr.amount, 0))
        ]
      )
      setHireManagerCost(hireManagerCost + HIRE_MANAGER_COST_INCREMENT)
    }
  }

  function canHireManager() {
    return (
      money >= hireManagerCost &&
      workers.filter(it => it.type === 'broker').length >= 5
    )
  }


  return <Context.Provider value={{
      time,
      day,
      money,
      workers,
      collect,
      hire,
      hireCost,
      hireManager,
      hireManagerCost,
      canHireManager
    }}>
    {children}
  </Context.Provider>
}
