import React from "react"
import clsx from "clsx"
import {makeStyles} from "@material-ui/styles"
import Box from "@material-ui/core/Box"

import Grid from "@material-ui/core/Grid"
import Paper from "@material-ui/core/Paper"
import {Chart, Deposits, Orders, AdminLayout} from "components/dashboard"
import {Copyright} from "components"
import theme from "theme"

const useStyles: any = makeStyles(() => ({
  content: {
    flexGrow: 1,
    height: "100vh",
    // overflow: "auto",
  },
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    // overflow: "auto",
    flexDirection: "column",
  },
  fixedHeight: {
    height: 240,
  },
}))

export default function Dashboard() {
  const classes = useStyles()
  const [open, setOpen] = React.useState(true)
  const handleDrawerOpen = () => {
    setOpen(true)
  }
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight)

  return (
    <AdminLayout open={open} onClick={handleDrawerOpen}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={8} lg={9}>
          <Paper className={fixedHeightPaper}>
            <Chart />
          </Paper>
        </Grid>
        <Grid item xs={12} md={4} lg={3}>
          <Paper className={fixedHeightPaper}>
            <Deposits />
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <Orders />
          </Paper>
        </Grid>
      </Grid>
      <Box pt={4}>
        <Copyright />
      </Box>
    </AdminLayout>
  )
}
