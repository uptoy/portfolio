import { Typography } from "@mui/material"

interface IMessage {
  header: string
  message: boolean | string
}

const SuccessMessage = ({ header, message }: IMessage) => {
  return (
    <>
      <Typography variant="inherit">{header}</Typography>
      <Typography variant="inherit">{message}</Typography>
    </>
  )
}

export default SuccessMessage
