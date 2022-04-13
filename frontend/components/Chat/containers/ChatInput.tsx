import * as React from "react"
import {ChatInput as ChatInputComponent} from "../components/ChatInput"
import {useAppDispatch} from "../store"
import {addChatError, addChatMessage, fetchChatMessage} from "../chatSlice"
import Button from "@material-ui/core/Button"
import Grid from "@material-ui/core/Grid"

const demoUrl = "http://localhost:3000/sample"
const errorMessage = "A demo error"

export const ChatInput = () => {
  const dispatch = useAppDispatch()
  const onAddMessage = (text: string) => dispatch(addChatMessage({text}))
  // const onFetchAsyncMessage = () => dispatch(fetchChatMessage(demoUrl))
  // const onDemoError = () => dispatch(addChatError(errorMessage))
  return (
    <>
      <Grid container spacing={2} style={{justifyContent: "center"}}>
        <Grid item sm={10} xs={12}>
          <ChatInputComponent onAddMessage={onAddMessage} />
        </Grid>
        <Grid item>
          <Button
            onClick={() => {}}
            variant="contained"
            color="secondary"
            style={{padding: "0.5em"}}
          >
            Send
          </Button>
        </Grid>
      </Grid>
    </>
  )
}
