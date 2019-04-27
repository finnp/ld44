import React from 'react'
import styled from 'styled-components'
import {map} from 'lodash'

const Amount = styled.span`
  text-align: right;
  font-size: 1.3em;
`

const Currency = styled.span`
  font-size: 1.3em;
`

const MoneyStyled = styled.div`
  margin-right: 4em;
`


const state = {
  USD: 5000,
  EUR: 10000,
  GBP: 20
}

export default function Money () {

  return <MoneyStyled>
    {map(state, (value, currency) => {
      const number =  Intl.NumberFormat('en-US', { style: 'decimal', minimumFractionDigits: 2 }).format(value)
      return <div><Currency>{currency}</Currency> <Amount>{number}</Amount></div>
    })}
  </MoneyStyled>
}
