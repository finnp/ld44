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
const INITIAL_HIRE_MANAGER_COST = BROKERS_PER_MANAGER * INITIAL_HIRE_COST
const HIRE_MANAGER_COST_INCREMENT = BROKERS_PER_MANAGER * HIRE_COST_INCREMENT
const WORKER_SKILL = BROKERS_PER_MANAGER
const MANAGER_SKILL = BROKERS_PER_MANAGER * WORKER_SKILL
export const SKILL_INCREASE_PER_POSSESSION = 0.2

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

const WOKRER_TYPES = [
  {
    type: 'broker',
    skill: WORKER_SKILL,
    cost: INITIAL_HIRE_COST,
  },
  {
    type: 'manager',
    skill: MANAGER_SKILL,
    cost: INITIAL_HIRE_MANAGER_COST,
  }
]


export function Store ({children}) {
  const [day, setDay] = useState(1)

  const [money, setMoney] = useState(INITIAL_HIRE_COST)

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

  function createWorker(type, initialAmount) {
    const archetype = WOKRER_TYPES.find(it => it.type === type)

    return {
      ...archetype,
      id: Math.random(),
      amount: initialAmount || 0,
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
      setWorkers([...workers, createWorker('broker')])
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
          createWorker('manager', managedBrokers.reduce((acc, curr) => acc + curr.amount, 0))
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
    }}>
    {children}
  </Context.Provider>
}
