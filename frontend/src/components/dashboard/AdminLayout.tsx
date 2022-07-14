import React, { ReactChild } from 'react'
import { makeStyles } from '@material-ui/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import { AdminSidebar, AdminHeader } from 'src/components/dashboard'
import theme from 'src/theme'
import Container from '@material-ui/core/Container'

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex'
  },
  container: {
    paddingTop: theme.spacing(4)
  },
  content: {
    flexGrow: 1,
    height: '100vh'
  },
  appBarSpacer: theme.mixins.toolbar
}))

export default function AdminLayout(children: ReactChild) {
  const classes = useStyles()
  const [open, setOpen] = React.useState(true)
  const handleDrawerOpen = () => {
    setOpen(true)
  }
  const handleDrawerClose = () => {
    setOpen(false)
  }

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AdminHeader open={open} onClick={handleDrawerOpen} />
      <AdminSidebar open={open} onClick={handleDrawerClose} />
      <Container maxWidth="xl" className={classes.container}>
        <main className={classes.content}>
          <div className={classes.appBarSpacer} />
          {children}
        </main>
      </Container>
    </div>
  )
}
