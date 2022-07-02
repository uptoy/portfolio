import * as React from "react"
import { makeStyles } from "@material-ui/styles"
import theme from "src/theme"

const useStyles: any = makeStyles(() => ({
  about: {
    paddingTop: "3em",
    display: "grid",
    justifyContent: "center",
  },
  title: {
    paddingTop: "50px",
    paddingBottom: "30px",
    textAlign: "center",
    fontSize: "36px",
  },
  version: {
    display: "flex",
    justifyContent: "center",
    fontSize: "24px",
    color: "darkcyan",
  },
  desc: {
    padding: "0px 50px",
    fontSize: "20px",
  },
}))

const AdminAbout = () => {
  const classes = useStyles()
  return (
    <>
      <div className={classes.about}>
        <div className={classes.title}>
          <b>About</b>
        </div>
        <div className={classes.version}>Admin</div>
        <div className={classes.desc}>
          <p>admin</p>
        </div>
      </div>
    </>
  )
}

export default AdminAbout
