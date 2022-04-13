import React, {ChangeEvent, KeyboardEvent, useState} from "react"
import {TextField} from "@material-ui/core"
import {makeStyles} from "@material-ui/styles"
import theme from "theme"

const useStyles: any = makeStyles(() => ({
  textField: {
    backgroundColor: "#ffffff",
    width: "100%",
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
}
export const ChatInput = ({onAddMessage}: Props) => {
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
        className={classes.textField}
      />
    </div>
  )
}
