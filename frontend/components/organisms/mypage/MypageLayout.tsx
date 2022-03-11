import React from "react"
import { Container } from "@material-ui/core"
import MypageHeader from ".//MypageHeader"
import MypageFooter from "./MypageFooter"
import { makeStyles } from "@material-ui/styles"
import theme from "theme"
import { Grid } from "@material-ui/core"
import { MypageSidebar } from "components/organisms/mypage"

const useStyles: any = makeStyles(() => ({
  container: {
    marginTop: theme.spacing(2),
  },
}))

const DashboardLayout: React.FC = ({ children }) => {
  const classes = useStyles()
  return (
    <>
      <MypageHeader />
      <Container maxWidth="lg">
        <main>
          <Grid container spacing={3} className={classes.container}>
            <Grid item md={3} xs={12}>
              <MypageSidebar />
            </Grid>
            <Grid item md={9} xs={12}>
              {children}
            </Grid>
          </Grid>
        </main>
      </Container>
      <MypageFooter />
    </>
  )
}

export default DashboardLayout
