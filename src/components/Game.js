import React from 'react'
import useStore from '../Store'
import {Container, Button, List} from 'nes-react'
import styled from 'styled-components'

export default function Game() {
  const {
    time,
    day,
    money,
    workers,
    hire,
    hireCost,
    hireManager,
    hireManagerCost,
    canHireManager,
    possessions,
    getUpgrade,
  } = useStore()

  const date = new Date(Date.UTC(2012, 11, 20, 8, 30, 0) + time * 1000 * 60)

  const upgrade = getUpgrade()

  return  (
    <GameContainer>
      <FlexContainer>
        <Container title="Time">
          Day {day} {date.toTimeString().split(':').slice(0,2).join(':')}
        </Container>
        <Container title="Money">
          ${money}
        </Container>
      </FlexContainer>
      {upgrade && (
        <Container title="Shop">
          <FullWidthButton disabled={upgrade.disabled} warning onClick={upgrade.action}>
            Buy {upgrade.name} ${upgrade.price}
          </FullWidthButton>
        </Container>
      )}
      <Container title="Workforce">
        {workers.map((worker, index) => <Worker index={index} {...worker} />)}
        <FullWidthButton 
          disabled={money < hireCost}
          onClick={hire}
          primary
        >
          Hire broker ${hireCost}
        </FullWidthButton>
        <FullWidthButton 
          disabled={!canHireManager()}
          onClick={hireManager}
          primary
        >
          Hire manager ${hireManagerCost}
        </FullWidthButton>
      </Container>
      {possessions.length > 0 && (
        <Container title="Upgrades">
          <List>
            {possessions.map(it => <li>{it}</li>)}
          </List>
        </Container>
      )}
    </GameContainer>
  )
}

function Worker({amount, index, type}) {
  const {collect} = useStore()

  return (
    <WorkerContainer>
      {type === 'broker' ? <BrokerSprite /> : <ManagerSprite />} 
      ${amount}
      <Button onClick={collect.bind(null, index)} success>Collect</Button>
    </WorkerContainer>
  )
}

const GameContainer = styled.div`
  width: 50vh;
  margin: 0 auto;
` 

const FlexContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
`

const WorkerContainer = styled(FlexContainer)`
  align-items: center;
  margin-top: 10px; 
`

const FullWidthButton = styled(Button)`
  width: 100%;
  margin-top: 20px;
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