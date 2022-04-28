interface IMessage {
  header: string
  message: boolean
}

const ErrorMessage = ({ header, message }: IMessage) => {
  return (
    <>
      <p>{header}</p>
      <p>{message}</p>
    </>
  )
}

export default ErrorMessage
