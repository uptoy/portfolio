import { Typography, Drawer, Hidden, Divider } from '@mui/material'
import SidebarList from './SidebarList'

const drawerWidth = 240

// const useStyles: any = makeStyles(() => ({}))

interface Props {
  window?: () => Window
  isMobileSidebarOpen: boolean
  toggleMobileSidebar(): void
}

const Sidebar: React.FC<Props> = ({ isMobileSidebarOpen, toggleMobileSidebar, window }) => {
  // const classes = useStyles()
  // const theme = useTheme()

  const container = window !== undefined ? () => window().document.body : undefined

  // return (
  //   <nav className={classes.drawer} aria-label="menu">
  //     <Hidden smUp implementation="css">
  //       <Drawer
  //         container={container}
  //         variant="temporary"
  //         anchor={theme.direction === 'rtl' ? 'right' : 'left'}
  //         open={isMobileSidebarOpen}
  //         onClose={toggleMobileSidebar}
  //         classes={{
  //           paper: classes.drawerPaper
  //         }}
  //         ModalProps={{
  //           keepMounted: true
  //         }}
  //       >
  //         <div className={classes.drawerHeader}>
  //           <img src="http://placehold.jp/150x150.png" alt="logo" className={classes.logo} />
  //           <Typography variant="h6" color="inherit">
  //             Portfolio
  //           </Typography>
  //         </div>
  //         <SidebarList />
  //       </Drawer>
  //     </Hidden>
  //     <Hidden xsDown implementation="css">
  //       <Drawer
  //         classes={{
  //           paper: classes.drawerPaper
  //         }}
  //         variant="permanent"
  //         open
  //       >
  //         <div className={classes.drawerHeader}>
  //           <img src="http://placehold.jp/150x150.png" alt="Budgetpal logo" className={classes.logo} />
  //           <Typography variant="h6" color="inherit">
  //             Portfolio
  //           </Typography>
  //         </div>
  //         <Divider />
  //         <SidebarList />
  //       </Drawer>
  //     </Hidden>
  //   </nav>
  // )
  return(
    <div>

    </div>
  )
}

export default Sidebar
