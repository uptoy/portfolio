import React from 'react'
import { Box, ListItemText, Menu, MenuItem, Paper, List, ListSubheader } from '@mui/material'
import { common, cyan } from '@mui/material/colors'

const cyan600 = cyan['600']
const white = common.white
const RecentlyProducts = (props: any) => {
  // const useStyles: any = makeStyles(() =>
  //   createStyles({
  //     ListSubheader: {
  //       fontSize: 24,
  //       fontWeight: 500,
  //       backgroundColor: cyan600,
  //       color: white
  //     }
  //   })
  // )
  // const classes = useStyles()

  const rightIconMenu = (
    <Menu open={true}>
      <MenuItem>View</MenuItem>
    </Menu>
  )

  return (
    <Paper>
      <List>
        <ListSubheader
          sx={{
            fontSize: 24,
            fontWeight: 500,
            backgroundColor: cyan600,
            color: white
          }}
        >
          Recent Products
        </ListSubheader>
        {props.data.map((item: any) => (
          <Box component="div" key={item.title}>
            <ListItemText primary={item.title} secondary={item.text} />
          </Box>
        ))}
      </List>
    </Paper>
  )
}

export default RecentlyProducts
