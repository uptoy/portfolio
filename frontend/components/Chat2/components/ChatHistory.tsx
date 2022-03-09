import { CardContent, Typography, Card } from "@material-ui/core"
import React from "react"
import DeleteIcon from '@material-ui/icons/Delete';
import Icon from '@material-ui/core/Icon';

import { ChatMessage } from "../chatSlice"
import theme from "theme"
import { makeStyles } from "@material-ui/styles"

const useStyles: any = makeStyles(() => ({
  messageCard: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  messageCardContent: {
    display: "grid",
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

export const ChatHistory = ({ messages, onDeleteMessage }: Props) => {
  const classes = useStyles()
  const onDeleteButtonClick = (timestamp: number) => () => onDeleteMessage(timestamp)
  return (
    <div>
      {messages.map((message) => (
        <Card key={message.timestamp} className={classes.messageCard}>
          <CardContent className={classes.messageCardContent}>
            <Typography>{message.text}</Typography>
            <Icon
              aria-label="delete"
              onClick={onDeleteButtonClick(message.timestamp)}
            >
              <DeleteIcon />
            </Icon>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
