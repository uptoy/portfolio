import axios from "axios"
import {parseCookies} from "nookies"


export function getAPIClient(ctx?: any) {
  const {token: token} = parseCookies(ctx)
  const api = axios.create({
    baseURL: "http://localhost:8080/api",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  })

  api.interceptors.request.use((config) => {
    return config
  })

  if (token) {
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`
  }

  return api
}

// import { v4 as uuid } from 'uuid'

// type SignInRequestData = {
//   email: string;
//   password: string;
// }

// const delay = (amount = 750) => new Promise(resolve => setTimeout(resolve, amount))

// export async function signInRequest(data: SignInRequestData) {
//   await delay()

//   return {
//     token: uuid(),
//     user: {
//       name: '',
//       email: '',
//       avatar_url: ''
//     }
//   }
// }

// export async function recoverUserInformation() {
//   await delay()

//   return {
//     user: {
//       name: '',
//       email: '',
//       avatar_url: ''
//     }
//   }
// }
