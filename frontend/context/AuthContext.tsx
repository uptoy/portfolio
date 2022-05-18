import {createContext, ReactNode, useEffect, useState, useContext} from "react"
import {useRouter} from "next/router"
import {api} from "services/apiClient"
import toast from "react-hot-toast"
import {
  SignUpCredentials,
  SignInCredentials,
  ForgotPasswordCredentials,
  ResetPasswordCredentials,
} from "yup/type"
import {mutate} from "swr"
import {GetServerSidePropsContext, GetServerSideProps} from "next"

export type User = {
  username: string
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

// export const getServerSideProps: GetServerSideProps = async (ctx: GetServerSidePropsContext) => {
//   const token = ctx.req?.cookies
//   return {props: {token}}
// }

export function AuthProvider({children}: AuthProviderProps) {
  const router = useRouter()
  const [user, setUser] = useState<User | null>(null)
  // const [user, setUser] = useState({} as User)

  const isAuthenticated = !!user

  const BaseURL = "http://localhost:8080/api"
  useEffect(() => {
    me()
  }, [])

  const signUp = async ({email, username, password, confirmPassword}: SignUpCredentials) => {
    try {
      const response = await fetch(`${BaseURL}/auth/signup`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        credentials: "include",
        body: JSON.stringify({
          username,
          email,
          password,
          confirmPassword,
        }),
      })
      const data = await response.json()
      const user = data.user
      console.log("login user", user)
      setUser(user)
      router.push("/")
    } catch (err) {
      // throw new Error("error")
      if (err instanceof Error) {
        toast.error(err.message)
        console.log("Failed", err.message)
      } else {
        console.log("Unknown Failure", err)
      }
    }
  }

  const signIn = async ({email, password}: SignInCredentials) => {
    try {
      const response = await fetch(`${BaseURL}/auth/signin`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        credentials: "include",
        body: JSON.stringify({
          email,
          password,
        }),
      })
      const data = await response.json()
      const user = data.user
      console.log("login user", user)
      setUser(user)
      router.push("/")
    } catch (err) {
      if (err instanceof Error) {
        toast.error(err.message)
        console.log("Failed", err.message)
      } else {
        console.log("Unknown Failure", err)
      }
    }
  }
  const signOut = async () => {
    try {
      await fetch(`${BaseURL}/auth/signout`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        credentials: "include",
      })
      toast.success("Success SignOut")
      setUser({} as User)
      router.push("/auth/signout")
    } catch (err) {
      if (err instanceof Error) {
        toast.error(err.message)
        console.log("Failed", err.message)
      } else {
        console.log("Unknown Failure", err)
      }
    }
  }

  const forgotPassword = async ({email}: ForgotPasswordCredentials) => {
    try {
      await fetch(`${BaseURL}/auth/forgot_password`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        credentials: "include",
        body: JSON.stringify({
          email,
        }),
      })

      toast.success("Sent you an email so please check it.")
      router.push("/dashboard")
    } catch (err) {
      if (err instanceof Error) {
        toast.error(err.message)
        console.log("Failed", err.message)
      } else {
        console.log("Unknown Failure", err)
      }
    }
  }

  const resetPassword = async ({email, password, confirmPassword}: ResetPasswordCredentials) => {
    try {
      await fetch(`${BaseURL}/auth/reset_password`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        credentials: "include",
        body: JSON.stringify({
          email,
          password,
          confirmPassword,
        }),
      })
      toast.success("Sent you an email so please check it.")
      router.push("/")
    } catch (err) {
      if (err instanceof Error) {
        toast.error(err.message)
        console.log("Failed", err.message)
      } else {
        console.log("Unknown Failure", err)
      }
    }
  }
  const me = async () => {
    try {
      const response = await fetch(`${BaseURL}/auth/me`, {
        method: "GET",
        headers: {"Content-Type": "application/json"},
        credentials: "include",
      })
      const data = await response.json()
      const user = data.user
      setUser(user)
    } catch (err) {
      if (err instanceof Error) {
        toast.error(err.message)
        console.log("Failed", err.message)
      } else {
        console.log("Unknown Failure", err)
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

//auth context n
export function useAuth() {
  const context = useContext(AuthContext)
  return context
}
