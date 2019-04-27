import React from 'react'
import useStore from '../Store'

export default function Orders () {
  const {time, day} = useStore()
  const date = new Date(Date.UTC(2012, 11, 20, 8, 30, 0) + time * 1000 * 60);
  return <>
    <h2>Day {day}</h2>
    <h2>{date.toTimeString().split(':').slice(0,2).join(':')}</h2>
  </>
}
