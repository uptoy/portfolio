import {CardContent, Typography, Card} from "@material-ui/core"
import React from "react"
import DeleteIcon from "@material-ui/icons/Delete"
import Icon from "@material-ui/core/Icon"
import Avatar from "@material-ui/core/Avatar"

import {ChatMessage} from "../chatSlice"
import theme from "theme"
import {makeStyles} from "@material-ui/styles"

const useStyles: any = makeStyles(() => ({
  messageCardContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "end",
  },
  messageCard: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  messageCardContent: {
    display: "grid",
    width: "100%",
    gridTemplateColumns: "1fr auto",
    "&:last-child": {
      paddingBottom: theme.spacing(2),
    },
  },
}))

export interface Props {
  readonly messages: ReadonlyArray<ChatMessage>
  readonly onDeleteMessage: (timestamp: number) => void
}

export const ChatHistory = ({messages, onDeleteMessage}: Props) => {
  const classes = useStyles()
  const onDeleteButtonClick = (timestamp: number) => () => onDeleteMessage(timestamp)
  return (
    <div>
      {messages.map((message) => (
        <div className={classes.messageCardContainer}>
          <Card key={message.timestamp} className={classes.messageCard}>
            <CardContent className={classes.messageCardContent}>
              <Icon
                aria-label="delete"
                onClick={onDeleteButtonClick(message.timestamp)}
                style={{marginRight: 10}}
              >
                <DeleteIcon />
              </Icon>
              <Typography>{message.text}</Typography>
            </CardContent>
          </Card>
          <Avatar alt="Avatar" style={{marginLeft: 10}} />
        </div>
      ))}
    </div>
  )
}
