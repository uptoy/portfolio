import React from "react"
import CircularProgress from "@material-ui/core/CircularProgress"
import {makeStyles} from "@material-ui/styles"
import theme from "theme"

export const Circular = () => {
  const useStyles: any = makeStyles(() => ({
    root: {
      height: "10em",
      position: "relative",
    },
    circular: {
      margin: 0,
      position: "absolute",
      top: "100%",
      left: "50%",
      marginRight: "-50%",
    },
  }))

  const classes = useStyles()

  return (
    <div className={classes.root}>
      <CircularProgress color="secondary" className={classes.circular} />
    </div>
  )
}
