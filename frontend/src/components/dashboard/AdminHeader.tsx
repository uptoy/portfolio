import React from 'react'
import { Typography, Badge, AppBar, Toolbar } from '@mui/material'
import { Circular } from 'src/components/common/Circular'
import NotificationsIcon from '@mui/icons-material/Notifications'
import MenuIcon from '@mui/icons-material/Menu'
// import { makeStyles } from '@material-ui/styles'
import { IconButton } from '@mui/material'

// import theme from 'src/theme'
import clsx from 'clsx'

const drawerWidth = 240

// const useStyles: any = makeStyles(() => ({
//   toolbar: {
//     paddingRight: 24 // keep right padding when drawer closed
//   },
//   appBar: {
//     zIndex: theme.zIndex.drawer + 1,
//     transition: theme.transitions.create(['width', 'margin'], {
//       easing: theme.transitions.easing.sharp,
//       duration: theme.transitions.duration.leavingScreen
//     })
//   },
//   appBarShift: {
//     marginLeft: drawerWidth,
//     width: `calc(100% - ${drawerWidth}px)`,
//     transition: theme.transitions.create(['width', 'margin'], {
//       easing: theme.transitions.easing.sharp,
//       duration: theme.transitions.duration.enteringScreen
//     })
//   },
//   menuButton: {
//     marginRight: 36
//   },
//   menuButtonHidden: {
//     display: 'none'
//   },
//   title: {
//     flexGrow: 1
//   }
// }))

const AdminHeader = (props: any) => {
  // const classes = useStyles()
  return (
    // <AppBar position="absolute" className={clsx(classes.appBar, props.open && classes.appBarShift)}>
    //   <Toolbar
    //     sx={{
    //       paddingRight: 24
    //     }}
    //   >
    //     <IconButton
    //       edge="start"
    //       color="inherit"
    //       aria-label="open drawer"
    //       onClick={props.onClick}
    //       className={clsx(classes.menuButton, props.open && classes.menuButtonHidden)}
    //     >
    //       <MenuIcon />
    //     </IconButton>
    //     <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
    //       Dashboard
    //     </Typography>
    //     <IconButton color="inherit">
    //       <Badge badgeContent={4} color="secondary">
    //         <NotificationsIcon />
    //       </Badge>
    //     </IconButton>
    //   </Toolbar>
    // </AppBar>
    <div>header</div>
  )
}

export default AdminHeader
