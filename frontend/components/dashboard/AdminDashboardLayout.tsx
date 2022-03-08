import React from "react"
import clsx from "clsx"
import { makeStyles } from "@material-ui/styles"
import CssBaseline from "@material-ui/core/CssBaseline"
import { Chart, Deposits, Orders, DashboardSidebar, DashboardHeader } from "components/dashboard"
import { Copyright } from "components"
import theme from "theme"

const useStyles: any = makeStyles(() => ({
  root: {
    display: "flex",
  },
  content: {
    flexGrow: 1,
    height: "100vh",
    overflow: "auto",
  },
  appBarSpacer: theme.mixins.toolbar as any,
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
