import React from 'react'
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts'
import { Box, Paper, Avatar, List, ListItem, ListItemText, ListItemAvatar, Grid } from '@mui/material'

interface BrowserUsageProps {
  data: any
}

const BrowserUsage = (props: BrowserUsageProps) => {
  // const useStyles: any = makeStyles(() => ({
  //   paper: {
  //     minHeight: 344,
  //     padding: 10
  //   },
  //   legend: {
  //     paddingTop: 20
  //   },
  //   pieChartDiv: {
  //     height: 290,
  //     textAlign: 'center'
  //   },
  //   title: {
  //     fontSize: 24,
  //     fontWeight: 500, //  TypographyStyle.fontWeightLight,
  //     marginBottom: 20
  //   },
  //   clear: {
  //     clear: 'both'
  //   }
  // }))
  // const classes = useStyles()

  return (
    <Paper sx={{ minHeight: 344, padding: 10 }}>
      <span
        style={{
          fontSize: 24,
          fontWeight: 500, //  TypographyStyle.fontWeightLight,
          marginBottom: 20
        }}
      >
        Browser Usage
      </span>
      <div style={{ clear: 'both' }} />

      <Grid container spacing={2}>
        <Grid item xs={12} md={8}>
          <Box sx={{ height: 290, textAlign: 'center' }}>
            <ResponsiveContainer>
              <PieChart>
                <Pie innerRadius={80} outerRadius={130} data={props.data} dataKey="value" fill="#8884d8">
                  {props.data.map((item: any) => (
                    <Cell key={item.name} fill={item.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </Box>
          {/*
        </div> */}
        </Grid>
        <Grid item xs={12} md={4}>
          {/* <div className="col-xs-12 col-sm-4 col-md-4 col-lg-4"> */}
          <div style={{ paddingTop: 20 }}>
            <div style={{ paddingTop: 20 }}>
              <List>
                {props.data.map((item: any, index: any) => (
                  <ListItem key={item.name}>
                    <ListItemAvatar>
                      <Avatar style={{ backgroundColor: item.color }}>{item.icon}</Avatar>
                    </ListItemAvatar>
                    <ListItemText id={'brower' + index} primary={item.name} />
                  </ListItem>
                ))}
              </List>
            </div>
          </div>
        </Grid>
      </Grid>
    </Paper>
  )
}

export default BrowserUsage
