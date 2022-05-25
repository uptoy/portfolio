import React from "react"
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts"
import {Paper,Avatar,List,ListItem,ListItemText, ListItemAvatar, Grid} from "@material-ui/core"
import { makeStyles } from "@material-ui/styles"

interface BrowserUsageProps {
  data: any
}

const BrowserUsage = (props: BrowserUsageProps) => {
  const useStyles: any = makeStyles(() => ({
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
  }))
  const classes = useStyles()

  return (
    <Paper className={classes.paper}>
      <span className={classes.title}>Browser Usage</span>
      <div className={classes.clear} />

      <Grid container spacing={2}>
        <Grid item xs={12} md={8}>
          <div className={classes.pieChartDiv}>
            <ResponsiveContainer>
              <PieChart>
                <Pie
                  innerRadius={80}
                  outerRadius={130}
                  data={props.data}
                  dataKey="value"
                  fill="#8884d8"
                >
                  {props.data.map((item: any) => (
                    <Cell key={item.name} fill={item.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>
          {/*
        </div> */}
        </Grid>
        <Grid item xs={12} md={4}>
          {/* <div className="col-xs-12 col-sm-4 col-md-4 col-lg-4"> */}
          <div className={classes.legend}>
            <div className={classes.legend}>
              <List>
                {props.data.map((item: any, index: any) => (
                  <ListItem key={item.name}>
                    <ListItemAvatar>
                      <Avatar style={{ backgroundColor: item.color }}>{item.icon}</Avatar>
                    </ListItemAvatar>
                    <ListItemText id={"brower" + index} primary={item.name} />
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
