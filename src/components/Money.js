import React from 'react'
import styled from 'styled-components'
import {map, round} from 'lodash'
import useStore from '../Store'

const Amount = styled.span`
  text-align: right;
  font-size: 1.3em;
`

const Currency = styled.span`
  font-size: 1.3em;
`

const ExchangeRate = styled.div`
  padding-top: 1em;
  font-size: 1em;
`

const MoneyStyled = styled.div`
  margin-right: 4em;
`

export default function Money () {
  const {resources, currencies} = useStore()

  return <MoneyStyled>
    {map(resources, (amount, currency) => {
      const formattedAmount =  Intl.NumberFormat('en-US', { style: 'decimal', minimumFractionDigits: 2 }).format(amount)
      return <div><Currency>{currency}</Currency> <Amount>{formattedAmount}</Amount></div>
    })}
    <ExchangeRate>1 EUR = {round(currencies['EUR'] / currencies['USD'], 4).toFixed(4)} USD</ExchangeRate>
  </MoneyStyled>
}
