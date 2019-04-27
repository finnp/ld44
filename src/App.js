import React from 'react'
import styled from 'styled-components'
import Chart from './components/Chart'
import GlobalStyle from './GlobalStyle'
import Money from './components/Money'

function App() {
  return (
    <AppContainer>
      <GlobalStyle />
      <div class="grid-container">
        <div class="orders"><h2>Orders</h2></div>
        <div class="input"><h2>Input</h2></div>
        <div class="chart">
          <h2>Chart</h2>
          <Chart data={[
            {time: '0:00', '€/$': 0.32},
            {time: '1:00', '€/$': 0.41},
            {time: '2:00', '€/$': 0.38},
            {time: '3:00', '€/$': 0.45},
            {time: '4:00', '€/$': 0.45},
            {time: '5:00', '€/$': 0.47},
            {time: '6:00', '€/$': 0.46},
            {time: '7:00', '€/$': 0.52},
            {time: '8:00', '€/$': 0.55},
            {time: '9:00', '€/$': 0.58},
            {time: '10:00', '€/$': 0.67},
            {time: '11:00', '€/$': 0.64},
            {time: '12:00', '€/$': 0.63},
            {time: '13:00', '€/$': 0.6},
            {time: '14:00', '€/$': 0.58},
            {time: '15:00', '€/$': 0.56},
            {time: '16:00', '€/$': 0.6},
            {time: '17:00', '€/$': 0.46},
            {time: '18:00', '€/$': 0.5},
            {time: '19:00', '€/$': 0.52},
            {time: '20:00', '€/$': 0.55},
            {time: '21:00', '€/$': 0.59},
            {time: '22:00', '€/$': 0.61},
            {time: '23:00', '€/$': 0.63},
            {time: '24:00', '€/$': 0.6},
            ]}
          />
      </div>
      <div class="money">
        <Money/>
      </div>
    </div>
    </AppContainer>
  )
}

const AppContainer = styled.div``

export default App;
