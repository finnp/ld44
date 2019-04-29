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
const BROKERS_PER_MANAGER = 4
const INITIAL_HIRE_MANAGER_COST = 100
const HIRE_MANAGER_COST_INCREMENT = INITIAL_HIRE_MANAGER_COST
const WORKER_SKILL = BROKERS_PER_MANAGER
export const SKILL_INCREASE_PER_POSSESSION = 0.2
const WORK_GAIN = 2

const SHOP = [
  {
    name: 'Whip',
    price: 300,
  },
  {
    name: 'Motivational posters',
    price: 700
  },
  {
    name: 'Windows XP',
    price: 5000,
  },
  {
    name: 'Agile seminar',
    price: 15000,
  },
  {
    name: '5kg White powder',
    price: 70000,
  },
  {
    name: 'Company retreat',
    price: 150000,
  },
  {
    name: 'Mansion',
    price: 1000000,
  }
]

const WORKER_TYPES = ['broker', 'manager']


export function Store ({children}) {
  const [day, setDay] = useState(1)

  const [money, setMoney] = useState(0)

  const [time, setTime] = useState(0)

  const [workers, setWorkers] = useState([])

  const [hireCost, setHireCost] = useState(INITIAL_HIRE_COST)

  const [hireManagerCost, setHireManagerCost] = useState(INITIAL_HIRE_MANAGER_COST)
  
  const [possessions, setPossessions] = useState([])


  function tick() {
    if (time >= END_OF_DAY) {
      endDay()
    } else {
      setTime(time + 1)
      setWorkers(workers.map(worker => (
        {
          ...worker,
          amount: (
            worker.amount + 
            random(1, Math.round((1 + SKILL_INCREASE_PER_POSSESSION * possessions.length) * worker.skill))
          )
        }
      )))
    }
  }

  function endDay() {
    setTime(0)
    setDay(day + 1)
  }

  function createWorker(subordinates) {
    return {
      skill: subordinates.length === 0 ? 
        WORKER_SKILL : 
        subordinates.reduce((skillSum, {skill}) => skillSum + skill, 0),
      id: Math.random(),
      amount: subordinates.reduce((amountSum, {amount}) => amountSum + amount, 0),
      type: subordinates.length === 0 ? 'broker' : WORKER_TYPES[WORKER_TYPES.indexOf(subordinates[0].type) + 1]
    }
  }

  useInterval(tick, MINUTE_LENGTH)

  function collect(index) {
    setMoney(money + workers[index].amount)
    setWorkers(workers.map((worker, i) => (
      {...worker, amount: index === i ? 0 : worker.amount}
    )))
  }

  function hire(type) {
    if (money >= hireCost) {
      setMoney(money - hireCost)
      setWorkers([...workers, createWorker([])])
      setHireCost(hireCost + HIRE_COST_INCREMENT)
    }
  }

  function hireManager() {
    if (canHireManager()) {
      setMoney(money - hireManagerCost)
      const managedBrokers = workers.filter(it => it.type === 'broker').slice(0,BROKERS_PER_MANAGER)
      setWorkers(
        [
          ...workers.filter(it => !managedBrokers.find(broker => broker.id === it.id)),
          createWorker(managedBrokers)
        ]
      )
      setHireManagerCost(hireManagerCost + HIRE_MANAGER_COST_INCREMENT)
    }
  }

  function canHireManager() {
    return (
      money >= hireManagerCost &&
      workers.filter(it => it.type === 'broker').length >= BROKERS_PER_MANAGER
    )
  }

  function getUpgrade() {
    const upgrade = SHOP.find(upgrade => !possessions.includes(upgrade.name))

    if (!upgrade) return

    const disabled = money < upgrade.price

    return {
      ...upgrade,
      disabled,
      action: () => {
        if (!disabled) {
          setMoney(money - upgrade.price)
          setPossessions([upgrade.name, ...possessions])
        }
      }
    }
  }

  function work() {
    setMoney(money + WORK_GAIN)
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
      canHireManager,
      possessions,
      getUpgrade,
      work
    }}>
    {children}
  </Context.Provider>
}
