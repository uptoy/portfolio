import {ChatHistory as ChatHistoryComponent} from "../components/ChatHistory"
import * as React from "react"
import {useAppDispatch, useAppSelector} from "../store"
import {deleteChatMessage} from "../chatSlice"

export const ChatHistory = () => {
  const messages = useAppSelector((s: any) =>
    [...s.chat.messages].sort((m1, m2) => m2.timestamp - m1.timestamp)
  )

  const dispatch = useAppDispatch()
  const onDeleteMessage = (timestamp: number) => dispatch(deleteChatMessage(timestamp))

  return (
    <div style={{width: "45%"}}>
      <ChatHistoryComponent messages={messages} onDeleteMessage={onDeleteMessage} />
    </div>
  )
}
