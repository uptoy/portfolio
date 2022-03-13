import React from "react"
import {CircularProgress, Box, Button, Avatar, Typography} from "@material-ui/core"
import Link from "@material-ui/core/Link"
import {makeStyles} from "@material-ui/styles"
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos"
import {useRouter} from "next/router"
import {ChatHistory, ChatInput} from "components/Chat"
import {Provider} from "react-redux"
import {store} from "components/Chat/store"
import theme from "theme"

const useStyles: any = makeStyles(() => ({
  chatWrapper: {position: "relative"},
  progress: {
    height: "100vh",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  chatInfoWrapper: {
    padding: theme.spacing(2),
    backgroundColor: "#f4f4f4",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  avatar: {
    marginRight: theme.spacing(2),
  },
  chatInfoAvatarWrapper: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    "&:focus": {
      textDecoration: "none",
    },
    "&:hover": {
      textDecoration: "none",
      color: theme.palette.secondary.main,
    },
    "&:visited": {
      textDecoration: "none",
    },
    "&:link": {
      textDecoration: "none",
    },
    "&:active": {
      textDecoration: "none",
    },
  },
  chatContent: {
    width: "100%",
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
    height: "80vh",
    overflowY: "auto",
    display: "flex",
    // flexDirection: "column",
    justifyContent: "end",
  },
  boxMessageOther: {
    display: "flex",
    flexDirection: "row",
  },
  boxMessageMe: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  textBubbleOther: {
    backgroundColor: "#f4f4f4",
    borderRadius: "1.3em",
    padding: "10px 20px",
    marginLeft: theme.spacing(2),
    marginBottom: theme.spacing(1),
    maxWidth: "600px",
  },
  textBubbleMe: {
    backgroundColor: theme.palette.primary.main,
    borderRadius: "1.3em",
    padding: "10px 20px",
    maxWidth: "600px",
    color: "white",
    marginBottom: theme.spacing(1),
  },
  messageInput: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    position: "fixed",
    bottom: "0",
    paddingLeft: theme.spacing(3),
    paddingRight: theme.spacing(3),
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
    backgroundColor: "#f4f4f4",
  },
  textField: {
    backgroundColor: "#ffffff",
  },
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

const ChatRoom = () => {
  const classes = useStyles()
  const router = useRouter()
  const sendMessage = () => {}
  const chatroomInfo = {
    username: "username",
    profilePicture: "profilePicture",
    firstname: "firstname",
  }
  const profileLink = `/profile/${chatroomInfo.username}`
  return (
    <>
      <Provider store={store}>
        <Box className={classes.chatWrapper}>
          <Box className={classes.chatInfoWrapper}>
            <Button
              variant="contained"
              color="secondary"
              className={classes.button}
              href="/chat"
              startIcon={<ArrowBackIosIcon />}
            >
              All
            </Button>
            <Box>
              <Link href={profileLink} className={classes.chatInfoAvatarWrapper}>
                <Avatar alt="Avatar" src={chatroomInfo.profilePicture} className={classes.avatar} />
                <Typography variant="h5">{chatroomInfo.firstname}</Typography>
              </Link>
            </Box>
            <Box></Box>
          </Box>
          <Box className={classes.chatContent} id="chat">
            <ChatHistory />
          </Box>
        </Box>
        <Box className={classes.messageInput}>
          <ChatInput />
        </Box>
      </Provider>
    </>
  )
}

export default ChatRoom
