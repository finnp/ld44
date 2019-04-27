import React from 'react'
import useStore from '../Store'
import {padStart} from 'lodash'

function Order ({order, onClick}) {
  const {type, from, to, timer} = order
  return <tr>
    <td>{type.toUpperCase()}</td>
    <td>{from.amount}</td>
    <td>{from.currency}</td>
    <td>@</td>
    <td>{to.amount}</td>
    <td>{to.currency}</td>
    <td>0:{padStart(timer, 2, '0')}</td>
    <td><button onClick={() => onClick(order)}>ok</button></td>
  </tr>
}

export default function Orders () {
  const {time, day,orders, acceptOrder} = useStore()
  const date = new Date(Date.UTC(2012, 11, 20, 8, 30, 0) + time * 1000 * 60);
  return <>
    <h2>Day {day}</h2>
    <h2>{date.toTimeString().split(':').slice(0,2).join(':')}</h2>
    <table>
      {orders.map(order => <Order order={order} onClick={acceptOrder}/>)}
    </table>
  </>
}
