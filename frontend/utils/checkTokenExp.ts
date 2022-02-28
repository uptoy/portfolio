// import jwt_decode from "jwt-decode"
// import { getAPI } from "services/api"

// interface IToken {
//   exp: number
//   iat: number
//   id: string
// }

// export const checkTokenExp = async (token: string) => {
//   const decoded: IToken = jwt_decode(token)

//   if (decoded.exp >= Date.now() / 1000) return
//   function checkToken(exp: number) {
//     if (Date.now() <= exp * 1000) {
//       console.log(true, "token is not expired")
//     } else {
//       console.log(false, "token is expired")
//     }
//   }
//   const res = await getAPI("refresh_token")
//   return res.data.access_token
// }
