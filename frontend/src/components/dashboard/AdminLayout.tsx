import React from 'react'
// import { makeStyles } from '@material-ui/styles'
// import CssBaseline from '@material-ui/core/CssBaseline'
import { AdminSidebar, AdminHeader } from 'src/components/dashboard'
import theme from 'src/theme'
import { Container, Box } from '@mui/material'
import CssBaseline from '@mui/material/CssBaseline'

// const useStyles: any = makeStyles(() => ({
//   root: {
//     display: 'flex'
//   },
//   container: {
//     paddingTop: theme.spacing(4)
//   },
//   content: {
//     flexGrow: 1,
//     height: '100vh'
//   },
//   appBarSpacer: theme.mixins.toolbar as any
// }))

export default function AdminLayout({ children }: any) {
  // const classes = useStyles()
  const [open, setOpen] = React.useState(true)
  const handleDrawerOpen = () => {
    setOpen(true)
  }
  const handleDrawerClose = () => {
    setOpen(false)
  }

  return (
    <Box
      sx={{
        display: 'flex'
      }}
    >
      <CssBaseline />
      {/* <AdminHeader open={open} onClick={handleDrawerOpen} />
      <AdminSidebar open={open} onClick={handleDrawerClose} /> */}
      <Container
        maxWidth="xl"
        sx={{
          paddingTop: theme.spacing(4)
        }}
      >
        <main
          style={{
            flexGrow: 1,
            height: '100vh'
          }}
        >
          {/* <div className={classes.appBarSpacer} /> */}
          {children}
        </main>
      </Container>
    </Box>
  )
}
