import {createGlobalStyle} from 'styled-components'

const GlobalStyle = createGlobalStyle`

  body {
    background-color: black;
    background-image: radial-gradient(
      rgba(0, 150, 0, 0.75), black 120%
    );
    height: 100vh;
    color: white;
    font: 1.5rem Inconsolata, monospace;
    text-shadow: 0 0 5px #C8C8C8;
    overflow: hidden;
  }

  body::after {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      background: repeating-linear-gradient(
        0deg,
        rgba(0, 0, 0, 0.15),
        rgba(0, 0, 0, 0.15) 1px,
        transparent 1px,
        transparent 2px
      );
    }

  ::selection {
    background: #0080FF;
    text-shadow: none;
  }

  .grid-container {
  height: 100vh;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr 1fr;
  grid-template-areas: "orders chart chart chart" "orders chart chart chart" "orders input input money";
}

.orders { grid-area: orders; }

.input { grid-area: input; }

.chart { grid-area: chart; }
`

export default GlobalStyle
