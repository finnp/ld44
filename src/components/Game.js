import React from 'react'
import useStore, {SKILL_INCREASE_PER_POSSESSION} from '../Store'
import {Container, Button, List} from 'nes-react'
import styled from 'styled-components'

export default function Game() {
  return  (
    <GameContainer>
      <FlexContainer>
        <Workforce />
        <InfoContainer>
          <FlexContainer>
            <Time />
            <Money />
          </FlexContainer>
          <Shop />
          <Possessions />
        </InfoContainer>
      </FlexContainer>
    </GameContainer>
  )
}

function Possessions() {
  const {possessions} = useStore()

  if (possessions.length === 0) return null

  return (
    <Container title="Upgrades">
      <List>
        {possessions.map((it, index) => <li key={index}>{it} (+{SKILL_INCREASE_PER_POSSESSION * 100}%)</li>)}
      </List>
    </Container>
  )
}

function Workforce() {
  const {
    workers,
    money,
    hireCost,
    hire,
    hireManagerCost,
    hireManager,
    canHireManager
  } = useStore()

  return (
    <Container title="Workforce">
      {workers.map((worker, index) => <Worker key={index} index={index} {...worker} />)}
      <FullWidthButton 
        disabled={money < hireCost}
        onClick={hire}
        primary
      >
        Hire broker ${hireCost.toLocaleString('en-US')}
      </FullWidthButton>
      <FullWidthButton 
        disabled={!canHireManager()}
        onClick={hireManager}
        primary
      >
        Hire manager ${hireManagerCost.toLocaleString('en-US')}
      </FullWidthButton>
    </Container>
  )
}

function Worker({amount, index, type}) {
  const {collect} = useStore()

  return (
    <WorkerContainer key={index}>
      {type === 'broker' ? <BrokerSprite /> : <ManagerSprite />} 
      ${amount.toLocaleString('en-US')}
      <Button onClick={collect.bind(null, index)} success>Collect</Button>
    </WorkerContainer>
  )
}

function Time() {
  const {day, time} = useStore()

  const date = new Date(Date.UTC(2012, 11, 20, 8, 30, 0) + time * 1000 * 60)  

  return (
    <Container title="Time">
      Day {day} {date.toTimeString().split(':').slice(0,2).join(':')}
    </Container>
  )
}

function Money() {
  const {money} = useStore()

  return (
    <MoneyContainer title="Money">
      ${money.toLocaleString('en-US')}
    </MoneyContainer>
  )
}

function Shop() {
  const {getUpgrade} = useStore()

  const upgrade = getUpgrade()

  if (!upgrade) return null

  const {disabled, action, name, price} = upgrade

  return (
    <Container title="Shop">
      <FullWidthButton disabled={disabled} warning onClick={action}>
        Buy {name} ${price.toLocaleString('en-US')}
      </FullWidthButton>
    </Container>
  )

}

const GameContainer = styled.div`
  width: 50vh;
  margin: 0 auto;
` 

const FlexContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-around;
`

const WorkerContainer = styled(FlexContainer)`
  align-items: center;
  margin-top: 10px; 
  min-width: 400px;
`

const FullWidthButton = styled(Button)`
  width: 100%;
  margin-top: 20px;
`

const InfoContainer = styled.div`
  min-width: 400px;
`

const MoneyContainer = styled(Container)`
  min-width: 200px;
  text-align: right;
`

function BrokerSprite() {
  return (
    <img src="assets/broker.png" alt="Broker" />
  )
}

function ManagerSprite() {
  return (
    <img src="assets/manager.png" alt="Manager" />
  )
}