import React from 'react'
import styled from 'styled-components'
import GlobalStyle from './GlobalStyle'
import Money from './components/Money'

function App() {
  return (
    <AppContainer>
      <GlobalStyle />
      <div class="grid-container">
        <div class="orders"><h2>Orders</h2></div>
        <div class="input"><h2>Input</h2></div>
        <div class="chart"><h2>Chart</h2></div>
        <div class="money">
          <Money/>
        </div>
      </div>
    </AppContainer>
  )
}

const AppContainer = styled.div``

export default App;
