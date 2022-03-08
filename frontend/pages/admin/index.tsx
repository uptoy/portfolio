// import React from "react"
import Assessment from "@material-ui/icons/Assessment"
import Face from "@material-ui/icons/Face"
import ThumbUp from "@material-ui/icons/ThumbUp"
import ShoppingCart from "@material-ui/icons/ShoppingCart"
import { makeStyles } from "@material-ui/styles"
import { Grid, Container } from "@material-ui/core"
import { LineBarChart, BrowserUsage, InfoBox, NewOrders, MonthlySales } from "components/Admin"
import { cyan, pink, purple, orange, grey } from "@material-ui/core/colors"
import { AdminDashboardLayout } from "components/dashboard"
import Data from "data"

const cyan600 = cyan["600"]
const pink600 = pink["600"]
const purple600 = purple["600"]
const orange600 = orange["600"]
const grey600 = grey["600"]

const useStyles: any = makeStyles(() => ({
  navigation: {
    fontSize: 15,
    fontWeight: 400,
    color: grey600,
    display: "block",
  },
  cell: {
    padding: "1em",
  },
  content: {
    paddingTop: 60,
    padding: 20,
  },
}))

const AdminDashboard = () => {
  const classes = useStyles()
  return (
    <AdminDashboardLayout>
      <div className={classes.content}>
        <Grid container  spacing={3}>
          <Grid item className={classes.cell} xs={12} md={3}>
            <InfoBox Icon={ShoppingCart} spanBgColor={pink600} title="Total Profit" value="1500k" />
          </Grid>
          <Grid item className={classes.cell} xs={12} md={3}>
            <InfoBox Icon={ThumbUp} spanBgColor={cyan600} title="Likes" value="4231" />
          </Grid>
          <Grid item className={classes.cell} xs={12} md={3}>
            <InfoBox Icon={Assessment} spanBgColor={purple600} title="Sales" value="460" />
          </Grid>
          <Grid item className={classes.cell} xs={12} md={3}>
            <InfoBox Icon={Face} spanBgColor={orange600} title="New Members" value="248" />
          </Grid>
          <Grid item className={classes.cell} xs={12} md={6}>
            <NewOrders data={Data.dashBoardPage.newOrders} />
          </Grid>
          <Grid item className={classes.cell} xs={12} md={6}>
            <MonthlySales data={Data.dashBoardPage.monthlySales} />
          </Grid>
          <Grid item className={classes.cell} xs={12} md={6}>
            <LineBarChart data={Data.dashBoardPage.lineBarChart} />
          </Grid>
          <Grid item className={classes.cell} xs={12} md={6}>
            <BrowserUsage data={Data.dashBoardPage.browserUsage} />
          </Grid>
        </Grid>
      </div>
    </AdminDashboardLayout>
  )
}

export default AdminDashboard
