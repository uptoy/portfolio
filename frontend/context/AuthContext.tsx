import {createContext, ReactNode, useEffect, useState, useContext} from "react"
import Router from "next/router"
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

type User = {
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
  const [user, setUser] = useState<User | null>(null)
  // const [user, setUser] = useState({} as User)

  const isAuthenticated = !!user

  useEffect(() => {
    let cookies = parseCookies()
    let token = cookies["token"]
    // if (token) {
    //   me().then((response) => {
    //     setUser(response.user)
    //   })
    // }
  }, [])

  const signUp = async ({email, name, password, confirmPassword}: SignUpCredentials) => {
    try {
      const {data} = await api.post("/signup", {
        email,
        name,
        password,
        confirmPassword,
      })
      const {tokens, user} = data
      const token = tokens.idToken
      // const refreshToken = tokens.refreshToken
      console.log("data", data)
      console.log("token", tokens.idToken)
      console.log("user", user)

      setCookie(undefined, "token", token, {
        maxAge: 60 * 60 * 24 * 30, // 1 Month
        path: "/",
      })
      setUser(user)
      Router.push("/")
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data.message)
      } else {
        toast.error("Error creating account")
      }
    }
  }

  const signIn = async ({email, password}: SignInCredentials) => {
    try {
      const res = await api.post("/signin", {
        email,
        password,
      })
      const {token, refreshToken, user} = res.data
      setCookie(undefined, "token", token, {
        maxAge: 60 * 60 * 1, // 1 hour
        path: "/", // global
      })
      setCookie(undefined, "refreshToken", refreshToken, {
        maxAge: 60 * 60 * 24 * 30, // 30 days
        path: "/", // global
      })
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`
      setUser(user)
      Router.push("/dashboard")
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data.message)
      } else {
        toast.error("Error creating account")
      }
    }
  }
  const signOut = async () => {
    destroyCookie(undefined, "token")
    destroyCookie(undefined, "refreshToken")
    setUser({} as User)
    Router.push("/")
  }

  const forgotPassword = async ({email}: ForgotPasswordCredentials) => {
    try {
      await api.post("/forgot_password", {email})
      toast.success("Sent you an email so please check it.")
      Router.push("/dashboard")
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data.message)
      } else {
        toast.error("Error creating account")
      }
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
      Router.push("/dashboard")
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data.message)
      } else {
        toast.error("Error creating account")
      }
    }
  }
  const me = async () => {
    try {
      const res = await api.get(`/detail`)
      return res.data
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data.message)
      } else {
        toast.error("Error creating account")
      }
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

export function useAuth() {
  const context = useContext(AuthContext)
  return context
}
