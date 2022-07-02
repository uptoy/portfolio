import React from 'react'
import { Paper } from '@mui/material'
import { LineChart, Line, ResponsiveContainer } from 'recharts'
import { common, purple } from '@mui/material/colors'

const white = common.white
const purple600 = purple['600']
const purple500 = purple['500']

interface NewOrdersProps {
  data: any
}

const NewOrders = (props: NewOrdersProps) => {
  const styles = {
    paper: {
      backgroundColor: purple500,
      height: 150
    },
    div: {
      height: 95,
      padding: '5px 15px 0 15px'
    },
    header: {
      fontSize: 24,
      fontWeight: 500, //typography.fontWeightLight,
      color: white,
      backgroundColor: purple600,
      padding: 10
    }
  }

  return (
    <Paper style={styles.paper}>
      <div style={{ ...styles.header }}>New Orders</div>
      <div style={styles.div}>
        <ResponsiveContainer>
          <LineChart data={props.data}>
            <Line type="monotone" dataKey="pv" stroke="#8884d8" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </Paper>
  )
}

export default NewOrders
