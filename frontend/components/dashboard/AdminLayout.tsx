import React from "react"
import {makeStyles} from "@material-ui/styles"
import CssBaseline from "@material-ui/core/CssBaseline"
import {AdminSidebar, AdminHeader} from "components/dashboard"
import theme from "theme"
import Container from "@material-ui/core/Container"

const useStyles: any = makeStyles(() => ({
  root: {
    display: "flex",
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
    maxWidth: "none",
  },
  content: {
    flexGrow: 1,
    height: "100vh",
    // overflow: "auto",
  },
  appBarSpacer: theme.mixins.toolbar as any,
}))

export default function AdminLayout({children}: any) {
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
      <Container className={classes.container}>
        <main className={classes.content}>
          <div className={classes.appBarSpacer} />
          {children}
        </main>
      </Container>
    </div>
  )
}
