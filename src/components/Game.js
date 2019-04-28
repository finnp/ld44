import React from 'react'
import useStore from '../Store'
import {Container, Button, Sprite} from 'nes-react'
import styled from 'styled-components'

export default function Game() {
  const {time, day, money, workers, hire, hireCost} = useStore()

  const date = new Date(Date.UTC(2012, 11, 20, 8, 30, 0) + time * 1000 * 60);

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
      <Container title="Workforce">
        {workers.map((worker, index) => <Worker index={index} {...worker} />)}
        <HireButton onClick={hire} primary>Hire ${hireCost}</HireButton>
      </Container>
    </GameContainer>
  )
}

function Worker({amount, index}) {
  const {collect} = useStore()

  return (
    <WorkerContainer>
      <Sprite sprite="bcrikko" />
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

const HireButton = styled(Button)`
  width: 100%;
  margin-top: 20px;
`