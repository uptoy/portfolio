import React from "react"
import AppBar from "@material-ui/core/AppBar"
import Toolbar from "@material-ui/core/Toolbar"
import { ChatErrors, ChatHistory, ChatInput } from "components/Chat2"
import { makeStyles } from "@material-ui/styles"
import theme from "theme"
import { Provider } from "react-redux"
import { store } from "components/Chat2/store"

const useStyles: any = makeStyles(() => ({
  toolbar: {
    display: "grid",
    gridTemplateColumns: "auto auto",
    justifyItems: "end",
    [theme.breakpoints.down("md")]: {
      paddingLeft: theme.spacing(1),
      paddingRight: theme.spacing(1),
    },
  },
  title: {
    [theme.breakpoints.down("md")]: {
      fontSize: theme.typography.caption.fontSize,
    },
  },
  main: {
    display: "grid",
    height: "100vh",
    width: "100vw",
    gridTemplateRows: "auto 1fr",
    gridRowGap: 8,
    paddingTop: 100,
    paddingLeft: "20vw",
    paddingRight: "20vw",
    [theme.breakpoints.down("md")]: {
      paddingLeft: theme.spacing(1),
      paddingRight: theme.spacing(1),
    },
  },
}))

const Sample = () => {
  //async chat
  const classes = useStyles()
  return (
    <>
      <Provider store={store}>
        <div className={classes.main}>
          <ChatInput />
          <ChatHistory />
        </div>
        <ChatErrors />
      </Provider>
    </>
  )
}

export default Sample
