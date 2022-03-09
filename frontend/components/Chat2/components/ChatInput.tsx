import React, { ChangeEvent, KeyboardEvent, useState } from "react"
import CloudDownloadIcon from "@material-ui/icons/CloudDownload"
import ErrorIcon from "@material-ui/icons/Error"
import Tooltip from "@material-ui/core/Tooltip"
import Button from "@material-ui/core/Button"
import { Hidden, TextField, Typography} from "@material-ui/core"
import { makeStyles } from "@material-ui/styles"
import theme from "theme"

const useStyles: any = makeStyles(() => ({
  root: {
    display: "grid",
    gridTemplateColumns: "50% auto",
    gridColumnGap: theme.spacing(1),
    alignItems: "center",
  },
  buttons: {
    display: "grid",
    gridTemplateColumns: "auto auto",
    gridColumnGap: theme.spacing(1),
    [theme.breakpoints.down("sm")]: {
      gridColumnGap: theme.spacing(0.5),
    },
    justifyContent: "right",
    alignItems: "center",
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    [theme.breakpoints.down("sm")]: {
      paddingLeft: 0,
      paddingRight: 0,
    },
  },
  buttonLabel: {
    [theme.breakpoints.down("sm")]: {
      fontSize: theme.typography.caption.fontSize,
    },
  },
  icon: {
    marginLeft: theme.spacing(1),
    [theme.breakpoints.down("sm")]: {
      marginLeft: 0,
      marginRight: 0,
    },
  },
}))

export interface Props {
  readonly onAddMessage: (text: string) => void
  readonly onFetchAsyncMessage: () => void
  readonly onDemoError: () => void
}

export const ChatInput = ({ onAddMessage, onFetchAsyncMessage, onDemoError }: Props) => {
  const classes = useStyles()
  const [message, setMessage] = useState<string>("")

  const onChange = (e: ChangeEvent<HTMLInputElement>) => setMessage(e.target.value)
  const onKeyPress = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter" && message.trim().length !== 0) {
      onAddMessage(message)
      setMessage("")
    }
  }

  return (
    <div className={classes.root}>
      <TextField
        value={message}
        label="Compose Message"
        size={"small"}
        onChange={onChange}
        onKeyPress={onKeyPress}
      />
      <div className={classes.buttons}>
        <Tooltip title={"Fetch Async Message"}>
          <Button
            className={classes.button}
            color="primary"
            variant="outlined"
            fullWidth
            size={"large"}
            onClick={onFetchAsyncMessage}
          >
            <Hidden smDown>
              <Typography className={classes.buttonLabel}>Async</Typography>
            </Hidden>
            <CloudDownloadIcon className={classes.icon} />
          </Button>
        </Tooltip>
        <Tooltip title={"Demo Error Handling"}>
          <Button
            className={classes.button}
            color="secondary"
            variant="outlined"
            fullWidth
            size={"large"}
            onClick={onDemoError}
          >
            <Hidden smDown>
              <Typography className={classes.buttonLabel}>Error</Typography>
            </Hidden>
            <ErrorIcon className={classes.icon} />
          </Button>
        </Tooltip>
      </div>
    </div>
  )
}
