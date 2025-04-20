"use client"

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"

const data = [
  {
    month: "Jan",
    tokenized: 2,
    transferred: 1,
  },
  {
    month: "Feb",
    tokenized: 1,
    transferred: 2,
  },
  {
    month: "Mar",
    tokenized: 3,
    transferred: 0,
  },
  {
    month: "Apr",
    tokenized: 0,
    transferred: 3,
  },
  {
    month: "May",
    tokenized: 2,
    transferred: 1,
  },
  {
    month: "Jun",
    tokenized: 4,
    transferred: 2,
  },
]

export function AssetActivityChart() {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        data={data}
        margin={{
          top: 20,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="tokenized" name="Assets Tokenized" fill="#8884d8" />
        <Bar dataKey="transferred" name="Assets Transferred" fill="#82ca9d" />
      </BarChart>
    </ResponsiveContainer>
  )
}
