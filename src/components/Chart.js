import React from 'react'
import {ResponsiveContainer, LineChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Line} from 'recharts'

function Chart({data}) {
  return (
    <ResponsiveContainer width="90%">
    <LineChart
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
    </ResponsiveContainer>
  )
}

export default Chart
