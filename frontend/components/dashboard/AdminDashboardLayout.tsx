import React from "react"
import clsx from "clsx"
import { makeStyles } from "@material-ui/styles"
import CssBaseline from "@material-ui/core/CssBaseline"
import Box from "@material-ui/core/Box"
import Container from "@material-ui/core/Container"
import Grid from "@material-ui/core/Grid"
import Paper from "@material-ui/core/Paper"
import { Chart, Deposits, Orders, DashboardSidebar, DashboardHeader } from "components/dashboard"
import { Copyright } from "components"
import theme from "theme"

const useStyles: any = makeStyles(() => ({
  appBarSpacer: theme.mixins.toolbar as any,
  root: {
    display: "flex",
  },
  content: {
    flexGrow: 1,
    height: "100vh",
    overflow: "auto",
  },
}))

export default function AdminDashboardLayout({ children }: any) {
  const classes = useStyles()
  const [open, setOpen] = React.useState(true)
  const handleDrawerOpen = () => {
    setOpen(true)
  }
  const handleDrawerClose = () => {
    setOpen(false)
  }
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight)

  return (
    <div className={classes.root}>
      <CssBaseline />
      <DashboardHeader open={open} onClick={handleDrawerOpen} />
      <DashboardSidebar open={open} onClick={handleDrawerClose} />
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        {children}
      </main>
    </div>
  )
}
