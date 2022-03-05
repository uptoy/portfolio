import { createStyles } from '@material-ui/core/styles'
import { useTheme, Theme } from '@material-ui/core/styles'
import { makeStyles } from '@material-ui/styles'
import React, { useState } from 'react'

import Header from './Header'
// import Sidebar from './Sidebar'
// // import VerifyEmailAlert from '@/features/auth/components/VerifyEmailAlert';
// const theme = useTheme()

// const useStyles = makeStyles(() =>
//   createStyles({
//     root: {
//       display: 'flex',
//     },
//     content: {
//       flexGrow: 1,
//       padding: theme.spacing(3),
//     },
//     main: {
//       maxWidth: 1000,
//       margin: '0 auto',
//       position: 'relative',
//     },
//     drawerHeader: {
//       display: 'flex',
//       alignItems: 'center',
//       padding: theme.spacing(0, 1),
//       // necessary for content to be below app bar
//       ...theme.mixins.toolbar,
//       justifyContent: 'flex-end',
//     },
//     toolbar: theme.mixins.toolbar,
//   })
// );
// const classes = {
//   root: '',
//   content: '',
//   toolbar: '',
//   main: '',
// }

const Layout: React.FC = ({ children }) => {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false)

  function handleToggleMobileSidebar() {
    setIsMobileSidebarOpen(!isMobileSidebarOpen)
  }

  return (
    <div className="">
      {/* <Header toggleMobileSidebar={handleToggleMobileSidebar} /> */}
      {/* <Sidebar
        isMobileSidebarOpen={isMobileSidebarOpen}
        toggleMobileSidebar={handleToggleMobileSidebar}
      /> */}
      <main className="">
        <div className="" />
        {/* <VerifyEmailAlert /> */}
        <div className="">{children}</div>
      </main>
    </div>
  )
}

export default Layout
