import {createContext, ReactNode, useEffect, useState, useContext} from "react"
import {useRouter} from "next/router"
import {api} from "services/apiClient"
import toast from "react-hot-toast"
import {setCookie, parseCookies, destroyCookie} from "nookies"
import {
  SignUpCredentials,
  SignInCredentials,
  ForgotPasswordCredentials,
  ResetPasswordCredentials,
} from "yub/type"
import axios from "axios"
import {mutate} from "swr"

export type User = {
  name: string
  email: string
}

type AuthProviderProps = {
  children: ReactNode
}

type AuthContextType = {
  isAuthenticated: boolean
  user: User | null
  signUp: (signUpCredentials: SignUpCredentials) => Promise<void>
  signIn: (signInCredentials: SignInCredentials) => Promise<void>
  signOut: () => void
  forgotPassword: (email: ForgotPasswordCredentials) => void
  resetPassword: (resetPasswordCredentials: ResetPasswordCredentials) => void
  me: () => void
}

export const AuthContext = createContext({} as AuthContextType)

export function AuthProvider({children}: AuthProviderProps) {
  const router = useRouter()
  const [user, setUser] = useState<User | null>(null)
  // const [user, setUser] = useState({} as User)

  const isAuthenticated = !!user

  // useEffect(() => {
  // let cookies = parseCookies()
  // let token = cookies["token"]
  // if (token) {
  // me()
  //   .then((user) => {
  //     setUser(user)
  //   })
  //   .catch((err) => {
  //     console.log(err)
  //     signOut()
  //     router.push("/")
  //   })
  // }
  // }, [])

  const signUp = async ({email, name, password, confirmPassword}: SignUpCredentials) => {
    try {
      // await fetch("http://localhost:8080/api/auth/signup", {
      //   method: "POST",
      //   headers: {"Content-Type": "application/json"},
      //   body: JSON.stringify({
      //     email,
      //     name,
      //     password,
      //     confirmPassword,
      //   }),
      // })
      const {data} = await api.post("/auth/signup", {
        name,
        email,
        password,
        confirmPassword,
      })
      const {user} = data
      // let x = document.cookie;

      // const token = tokens.idToken.trim()
      // console.log("token", token)
      // const refreshToken = tokens.refreshToken.trim()
      // console.log("refreshToken", refreshToken)

      // setCookie(undefined, "token", token, {
      //   maxAge: 60 * 60 * 24, // 1 day
      //   path: "/",
      // })
      // setCookie(undefined, "refreshToken", refreshToken, {
      //   maxAge: 60 * 60 * 24 * 30, // 1 Month
      //   path: "/",
      // })
      // await fetch("http://localhost:8081/api/register", {
      //   method: "POST",
      //   headers: {"Content-Type": "application/json"},
      //   body: JSON.stringify({
      //     first_name: firstName,
      //     last_name: lastName,
      //     email,
      //     password,
      //   }),
      // })

      setUser(user)
      // console.log("cookies", x)
      // mutate("/wishlist")
      router.push("/")
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data.message)
      } else {
        toast.error("Error creating account")
      }
      throw error
    }

    // me().then((res) => console.log("res.data",setUser(res)))
  }

  const signIn = async ({email, password}: SignInCredentials) => {
    try {
      const {data} = await api.post("/auth/signin", {
        email,
        password,
      })
      const {user} = data
      // const token = tokens.idToken.trim()
      // const refreshToken = tokens.refreshToken.trim()
      // console.log("data", data)
      // console.log("token", tokens.idToken)
      // console.log("user", user)
      // setCookie(undefined, "token", token, {
      //   maxAge: 60 * 60 * 1, // 1 hour
      //   path: "/", // global
      // })
      // setCookie(undefined, "refreshToken", refreshToken, {
      //   maxAge: 60 * 60 * 24 * 30, // 30 days
      //   path: "/", // global
      // })
      // api.defaults.headers.common["Authorization"] = `Bearer ${token}`
      console.log("user", user)
      setUser(user)
      // router.push("/")
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data.message)
      } else {
        toast.error("Error creating account")
      }
      throw error
    }
    router.push("/")
  }
  const signOut = async () => {
    destroyCookie(undefined, "token")
    destroyCookie(undefined, "refreshToken")
    try {
      await api.post("/auth/signout")
      toast.success("Success SignOut")
      setUser({} as User)
      router.push("/auth/signout")
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data.message)
      } else {
        toast.error("Error sign out")
      }
      throw error
    }
  }

  const forgotPassword = async ({email}: ForgotPasswordCredentials) => {
    try {
      await api.post("/auth/forgot_password", {email})
      toast.success("Sent you an email so please check it.")
      router.push("/dashboard")
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data.message)
      } else {
        toast.error("Error creating account")
      }
      throw error
    }
  }

  const resetPassword = async ({email, password, confirmPassword}: ResetPasswordCredentials) => {
    try {
      await api.post("/forgot_password", {
        email,
        password,
        confirmPassword,
      })
      toast.success("Success reset password")
      router.push("/")
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data.message)
      } else {
        toast.error("Error creating account")
      }
      throw error
    }
  }
  const me = async () => {
    try {
      const res = await api.get(`/auth/me`)
      return res.data.user
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data.message)
      } else {
        toast.error("Error creating account")
      }
      throw error
    }
  }

  return (
    <AuthContext.Provider
      value={{user, isAuthenticated, signUp, signIn, signOut, forgotPassword, resetPassword, me}}
    >
      {children}
    </AuthContext.Provider>
  )
}

//auth context n
export function useAuth() {
  const context = useContext(AuthContext)
  return context
}
