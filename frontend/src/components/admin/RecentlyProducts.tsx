import React from "react"
import List from "@material-ui/core/List"
import ListSubheader from "@material-ui/core/ListSubheader"
import Paper from "@material-ui/core/Paper"
import MenuItem from "@material-ui/core/MenuItem"
import Menu from "@material-ui/core/Menu"

import { cyan, common } from "@material-ui/core/colors"
import { ListItemText } from "@material-ui/core"
import { makeStyles } from "@material-ui/styles"
import createStyles from "@material-ui/styles/createStyles"

const cyan600 = cyan["600"]
const white = common.white
const RecentlyProducts = (props: any) => {
  const useStyles: any = makeStyles(() =>
    createStyles({
      ListSubheader: {
        fontSize: 24,
        fontWeight: 500,
        backgroundColor: cyan600,
        color: white,
      },
    })
  )
  const classes = useStyles()

  const rightIconMenu = (
    <Menu open={true}>
      <MenuItem>View</MenuItem>
    </Menu>
  )

  return (
    <Paper>
      <List>
        <ListSubheader className={classes.ListSubheader}>Recent Products</ListSubheader>
        {props.data.map((item: any) => (
          <div key={item.title}>
            <ListItemText primary={item.title} secondary={item.text} />
          </div>
        ))}
      </List>
    </Paper>
  )
}

export default RecentlyProducts
