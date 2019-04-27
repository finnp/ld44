import React from 'react'
import {ResponsiveContainer, LineChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Line} from 'recharts'
import useStore, {END_OF_DAY} from '../Store'

function Chart() {
  const {stock} = useStore()
  return (
    <ResponsiveContainer width="90%">
    <LineChart
      data={stock}
      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
    >
      <CartesianGrid width={3} />
      <XAxis dataKey="time" type="number" domain={[0,END_OF_DAY]}/>
      <YAxis domain={[0,1]} />
      <Tooltip />
      <Legend />
      <Line dataKey="€/$" stroke="#8884d8" isAnimationActive={false}/>
    </LineChart>
    </ResponsiveContainer>
  )
}

export default Chart
