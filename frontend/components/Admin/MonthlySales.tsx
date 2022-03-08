import React from "react"
import Paper from "@material-ui/core/Paper"

import { BarChart, Bar, ResponsiveContainer, XAxis } from "recharts"

import { common, pink } from "@material-ui/core/colors"
import { makeStyles } from "@material-ui/styles"
import { createStyles } from "@material-ui/core/styles"

const white = common.white
const pink600 = pink["600"]
const pink500 = pink["500"]

interface MonthlySalesProps {
  data: any
}

const MonthlySales = (props: MonthlySalesProps) => {
  const useStyles: any = makeStyles(() =>
    createStyles({
      paper: {
        backgroundColor: pink600,
        height: 150,
      },
      div: {
        marginLeft: "auto",
        marginRight: "auto",
        width: "95%",
        height: 85,
      },
      header: {
        color: white,
        backgroundColor: pink500,
        padding: 10,
      },
      title: {
        fontSize: 24,
        fontWeight: 500,
        marginBottom: 20,
      },
    })
  )
  const classes = useStyles()

  return (
    <Paper className={classes.paper}>
      <div style={{ ...classes.title, ...classes.header }}>Monthly Sales</div>
      <div className={classes.div}>
        <ResponsiveContainer>
          <BarChart data={props.data}>
            <Bar dataKey="uv" fill={pink500} />
            <XAxis dataKey="name" stroke="none" tick={{ fill: white }} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Paper>
  )
}

export default MonthlySales
