interface IMessage {
  header: string
  message: boolean | string
}

const SuccessMessage = ({ header, message }: IMessage) => {
  return (
    <>
      <p>{header}</p>
      <p>{message}</p>
    </>
  )
}

export default SuccessMessage
