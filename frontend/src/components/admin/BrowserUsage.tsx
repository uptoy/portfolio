import React from 'react'
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts'
import { Box, Paper, Avatar, List, ListItem, ListItemText, ListItemAvatar, Grid, SvgIconTypeMap } from '@mui/material'
import { OverridableComponent } from '@mui/material/OverridableComponent'

interface BrowserUsageProps {
  data: IItem[]
}

type IItem = {
  name: string
  value: number
  color: string
  icon: any
}

const BrowserUsage = (props: BrowserUsageProps) => {
  return (
    <Paper sx={{ minHeight: 344, padding: 10 }}>
      <Box
        component="span"
        style={{
          fontSize: 24,
          fontWeight: 500,
          marginBottom: 20
        }}
      >
        Browser Usage
      </Box>
      <Box component="div" sx={{ clear: 'both' }} />

      <Grid container spacing={2}>
        <Grid item xs={12} md={8}>
          <Box sx={{ height: 290, textAlign: 'center' }}>
            <ResponsiveContainer>
              <PieChart>
                <Pie innerRadius={80} outerRadius={130} data={props.data} dataKey="value" fill="#8884d8">
                  {props.data.map((item) => (
                    <Cell key={item.name} fill={item.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </Box>
        </Grid>
        <Grid item xs={12} md={4}>
          <Box component="div" sx={{ paddingTop: 20 }}>
            <Box component="div" sx={{ paddingTop: 20 }}>
              <List>
                {props.data.map((item, index: number) => (
                  <ListItem key={item.name}>
                    <ListItemAvatar>
                      <Avatar style={{ backgroundColor: item.color }}>{item.icon}</Avatar>
                    </ListItemAvatar>
                    <ListItemText id={'brower' + index} primary={item.name} />
                  </ListItem>
                ))}
              </List>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Paper>
  )
}

export default BrowserUsage
