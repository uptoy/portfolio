import {createSlice, createAsyncThunk} from "@reduxjs/toolkit"
import {HYDRATE} from "next-redux-wrapper"
import {AxiosError} from "axios"
import Cookies from "js-cookie"

import * as AuthAPI from "./authApi"

import apiClient from "lib/apiClient"
import {User} from "types"

interface InitialState {
  user: User | null
  error: string | null | undefined
}

interface ValidationErrors {
  errors: Record<string, string>
  message: string
}

const CurrentUser = Cookies.get("currentUser")

const initialState: InitialState = {
  user: CurrentUser ? JSON.parse(CurrentUser as string) : null,
  error: null,
}

export const signin = createAsyncThunk(
  "user/signin",
  async ({email, password}: {email: string; password: string}, {rejectWithValue}) => {
    try {
      // await AuthAPI.getCSRFCookie()
      const response = await AuthAPI.signin(email, password)
      const token = response.data.tokens.idToken
      const user = response.data.user
      Cookies.set("accessToken", token)
      Cookies.set("currentUser", JSON.stringify(user))
      apiClient.defaults.headers.common["Authorization"] = `Bearer ${token}`
      return user
    } catch (err) {
      const error: AxiosError<ValidationErrors> = err

      if (!error.response) {
        throw error
      }
      return rejectWithValue(error.response.data)
    }
  }
)

export const signup = createAsyncThunk(
  "user/signup",
  async (
    {
      email,
      password,
      password_confirmation,
      username,
    }: {
      email: string
      password: string
      username: string
      password_confirmation: string
    },
    {rejectWithValue}
  ) => {
    try {
      // await AuthAPI.getCSRFCookie()
      const response = await AuthAPI.signup({
        email,
        username,
        password,
        password_confirmation,
      })
      const token = response.data.tokens.idToken
      const user = response.data.user
      Cookies.set("accessToken", token)
      Cookies.set("currentUser", JSON.stringify(user))
      apiClient.defaults.headers.common["Authorization"] = `Bearer ${token}`
      return user
    } catch (err) {
      const error: AxiosError<ValidationErrors> = err

      if (!error.response) {
        throw error
      }

      return rejectWithValue(error.response.data)
    }
  }
)

export const removeCurrentUser = createAsyncThunk("user/removeCurrentUser", async () => {
  Cookies.remove("accessToken")
  Cookies.remove("currentUser")
})

export const fetchCurrentUser = createAsyncThunk(
  "user/currentUser",
  async (_, {rejectWithValue}) => {
    try {
      const response = await AuthAPI.getCurrentUser()
      const user = response.data.user
      Cookies.set("currentUser", JSON.stringify(user))
      return user
    } catch (err) {
      const error: AxiosError<ValidationErrors> = err
      if (!error.response) {
        throw error
      }
      return rejectWithValue(error.response.data)
    }
  }
)

export const updateProfile = createAsyncThunk(
  "user/updateProfile",
  async (fields: {username: string; email: string}, {rejectWithValue}) => {
    try {
      const response = await AuthAPI.updateProfile(fields)
      const user = response.data.user
      Cookies.set("currentUser", JSON.stringify(user))
      return user
    } catch (err) {
      const error: AxiosError<ValidationErrors> = err
      if (!error.response) {
        throw error
      }
      return rejectWithValue(error.response.data)
    }
  }
)

export const updateSettings = createAsyncThunk(
  "user/updateSettings",
  async (fields: {language: string; currency: string; theme: string}, {rejectWithValue}) => {
    try {
      const response = await AuthAPI.updateSettings(fields)
      const user = response.data.user
      Cookies.set("currentUser", JSON.stringify(user))
      return user
    } catch (err) {
      const error: AxiosError<ValidationErrors> = err
      if (!error.response) {
        throw error
      }
      return rejectWithValue(error.response.data)
    }
  }
)

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(signin.fulfilled, (state, action) => {
      state.user = action.payload
    })
    builder.addCase(signin.rejected, (state, action: any) => {
      if (action.payload) {
        state.error = action.payload.message
      } else {
        state.error = action.error.message
      }
    })
    // builder.addCase(signinWithGoogle.fulfilled, (state, action) => {
    //   state.user = action.payload
    // })
    // builder.addCase(signinWithGoogle.rejected, (state, action: any) => {
    //   if (action.payload) {
    //     state.error = action.payload.message
    //   } else {
    //     state.error = action.error.message
    //   }
    // })
    builder.addCase(signup.fulfilled, (state, action) => {
      state.user = action.payload
    })
    builder.addCase(signup.rejected, (state, action: any) => {
      if (action.payload) {
        state.error = action.payload.message
      } else {
        state.error = action.error.message
      }
    })
    builder.addCase(fetchCurrentUser.fulfilled, (state, action) => {
      state.user = action.payload
    })
    builder.addCase(removeCurrentUser.fulfilled, (state) => {
      state.user = null
      state.error = null
    })
    builder.addCase(updateProfile.fulfilled, (state, action) => {
      state.user = action.payload
    })
    builder.addCase(updateSettings.fulfilled, (state, action) => {
      state.user = action.payload
    })
  },
})

export default authSlice.reducer

// export const signinWithGoogle = createAsyncThunk(
//   "user/signin/google",
//   async (accessToken: string, {rejectWithValue}) => {
//     try {
// await AuthAPI.getCSRFCookie()
// const response = await AuthAPI.signinWithGoogle(accessToken)
// const {token, user} = response.data.data
// Cookies.set("accessToken", token)
// Cookies.set("currentUser", JSON.stringify(user))
// apiClient.defaults.headers.common["Authorization"] = `Bearer ${token}`
//       return response.data.data.user
//     } catch (err) {
//       const error: AxiosError<ValidationErrors> = err

//       if (!error.response) {
//         throw error
//       }
//       return rejectWithValue(error.response.data)
//     }
//   }
// )
