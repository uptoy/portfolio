import React from 'react'
import { Drawer, List, Divider } from '@mui/material'
import { IconButton } from '@mui/material'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
// import { makeStyles } from '@material-ui/styles'
import theme from 'src/theme'
import clsx from 'clsx'
import { mainListItems, secondaryListItems } from 'src/components/dashboard/listItems'

const drawerWidth = 240

// const useStyles: any = makeStyles(() => ({
//   toolbarIcon: {
//     display: 'flex',
//     alignItems: 'center',
//     justifyContent: 'flex-end',
//     padding: '0 8px',
//     ...(theme.mixins.toolbar as any)
//   },
//   drawerPaper: {
//     position: 'relative',
//     whiteSpace: 'nowrap',
//     width: drawerWidth,
//     transition: theme.transitions.create('width', {
//       easing: theme.transitions.easing.sharp,
//       duration: theme.transitions.duration.enteringScreen
//     })
//   },
//   drawerPaperClose: {
//     // overflowX: "hidden",
//     transition: theme.transitions.create('width', {
//       easing: theme.transitions.easing.sharp,
//       duration: theme.transitions.duration.leavingScreen
//     }),
//     width: theme.spacing(7),
//     [theme.breakpoints.up('sm')]: {
//       width: theme.spacing(9)
//     }
//   }
// }))

const AdminSidebar = (props: any) => {
  // const classes = useStyles()
  return (
    <Drawer variant="permanent" open={props.open}>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-end',
          padding: '0 8px',
          ...theme.mixins.toolbar
        }}
      >
        <IconButton onClick={props.onClick}>
          <ChevronLeftIcon />
        </IconButton>
      </div>
      <Divider />
      <List>{mainListItems}</List>
      <Divider />
      <List>{secondaryListItems}</List>
    </Drawer>
  )
}

export default AdminSidebar
