import React from 'react'
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
  Legend
} from 'recharts'
import { Paper, Box, Typography } from '@mui/material'

interface LineBarChartProps {
  data: any
}

const LineBarChart = (props: LineBarChartProps) => {
  // const useStyles: any = makeStyles(() =>
  //   createStyles({
  //     paper: {
  //       minHeight: 344,
  //       padding: 10,
  //     },
  //     legend: {
  //       paddingTop: 20,
  //     },
  //     pieChartDiv: {
  //       height: 290,
  //       textAlign: "center" as any,
  //     },
  //     title: {
  //       fontSize: 24,
  //       fontWeight: 500, //  TypographyStyle.fontWeightLight,
  //       marginBottom: 20,
  //     },
  //     clear: {
  //       clear: "both" as any,
  //     },
  //   })
  // )
  // const classes = useStyles()

  return (
    <Paper
      sx={{
        minHeight: 344,
        padding: 10
      }}
    >
      <Typography component="span">Website Analysis</Typography>

      <Box
        sx={{
          clear: 'both'
        }}
      />

      <div className="row">
        <div className="col-xs-12">
          <Box
            sx={{
              height: 290,
              textAlign: 'center'
            }}
          >
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
          </Box>
        </div>
      </div>
    </Paper>
  )
}

export default LineBarChart
