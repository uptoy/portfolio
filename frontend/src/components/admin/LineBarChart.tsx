import React from "react"
import {
  ResponsiveContainer,
  ComposedChart,
  Line,
  Area,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts"
import Paper from "@material-ui/core/Paper"
import { makeStyles } from "@material-ui/styles"
import createStyles from "@material-ui/styles/createStyles"

interface LineBarChartProps {
  data: any
}

const LineBarChart = (props: LineBarChartProps) => {
  const useStyles = makeStyles(() =>
    createStyles({
      paper: {
        minHeight: 344,
        padding: 10,
      },
      legend: {
        paddingTop: 20,
      },
      pieChartDiv: {
        height: 290,
        textAlign: "center",
      },
      title: {
        fontSize: 24,
        fontWeight: 500, //  TypographyStyle.fontWeightLight,
        marginBottom: 20,
      },
      clear: {
        clear: "both",
      },
    })
  )
  const classes = useStyles()

  return (
    <Paper className={classes.paper}>
      <span className={classes.title}>Website Analysis</span>

      <div className={classes.clear} />

      <div className="row">
        <div className="col-xs-12">
          <div className={classes.pieChartDiv}>
            <ResponsiveContainer>
              <ComposedChart
                layout="vertical"
                width={600}
                height={320}
                data={props.data}
                margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
              >
                <XAxis type="number" />
                <YAxis dataKey="name" type="category" />
                <Tooltip />
                <Legend />
                <CartesianGrid stroke="#f5f5f5" />
                <Area dataKey="amt" fill="#8884d8" stroke="#8884d8" />
                <Bar dataKey="pv" barSize={20} fill="#413ea0" />
                <Line dataKey="uv" stroke="#ff7300" />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </Paper>
  )
}

export default LineBarChart
