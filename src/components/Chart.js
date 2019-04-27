import React from 'react'
import {LineChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Line} from 'recharts'

function Chart({data}) {
  return (
    <LineChart 
      width={730}
      height={250}
      data={data}
      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
    >
      <CartesianGrid width={3} />
      <XAxis dataKey="time" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Line dataKey="€/$" stroke="#8884d8" />
    </LineChart>
  )
}

export default Chart