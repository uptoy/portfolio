import { IUserSignUp, IBlog } from "types"

export const validSignUp = (userSignUp: IUserSignUp) => {
  const { username, email, password, password_confirm } = userSignUp
  const errors: string[] = []

  if (!username) {
    errors.push("Please add your username.")
  } else if (username.length > 20) {
    errors.push("Your username is up to 20 chars long.")
  }

  if (!email) {
    errors.push("Please add your email")
  } else if (!validateEmail(email)) {
    errors.push("Email format is incorrect.")
  }

  const msg = checkPassword(password, password_confirm)
  if (msg) errors.push(msg)

  return {
    errMsg: errors,
    errLength: errors.length
  }
}

export const checkPassword = (password: string, password_confirm: string) => {
  if (password.length < 6) {
    return "Password must be at least 6 chars."
  } else if (password !== password_confirm) {
    return "Confirm password did not match."
  }
}

export function validateEmail(email: string) {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return re.test(String(email).toLowerCase())
}
