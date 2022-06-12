const getFormattedDate = (initialDate: Date) => {
  const date = new Date(initialDate)
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()
  const formatted = `${year}/${month}/${day} ${hour}:${minute}:${second}`
  return formatted
}

export default getFormattedDate
