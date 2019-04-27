import React from 'react'
import styled from 'styled-components'
import {map} from 'lodash'
import useStore from '../Store'

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

export default function Money () {
  const {resources} = useStore()

  return <MoneyStyled>
    {map(resources, (amount, currency) => {
      const formattedAmount =  Intl.NumberFormat('en-US', { style: 'decimal', minimumFractionDigits: 2 }).format(amount)
      return <div><Currency>{currency}</Currency> <Amount>{formattedAmount}</Amount></div>
    })}
  </MoneyStyled>
}
