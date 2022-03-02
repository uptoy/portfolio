import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios, { AxiosError } from "axios"
import * as apiAuth from "services/apiAuth"
import apiClient from "services/apiClient"
import { IUser, IUserSignIn, IUserSignUp } from "types"
import { validSignUp } from "utils/validation"

interface ValidationErrors {
  errors: Record<string, string>
  message: string
}

interface InitialState {
  user: IUser | null
  error: string | null | undefined
}

const baseURL = "http://localhost:8080/api"

const localStorageCurrentUser = localStorage.getItem("currentUser")

const initialState: InitialState = {
  user: localStorageCurrentUser ? JSON.parse(localStorageCurrentUser as string) : null,
  error: null
}

//SignIn action
export const SignIn = createAsyncThunk(
  "user/signin",
  async (userSignIn: IUserSignIn, { rejectWithValue }) => {
    try {
      const response = await apiAuth.signin(SignIn)
      const { token, user } = response.data.data
      window.localStorage.setItem("accessToken", token)
      window.localStorage.setItem("currentUser", JSON.stringify(user))
      apiClient.defaults.headers.common["Authorization"] = `Bearer ${token}`
      return response.data.data.user
    } catch (err: any) {
      const error: AxiosError<ValidationErrors> = err
      if (!error.response) {
        throw error
      }
      return rejectWithValue(error.response.data)
    }
  }
)
export const SignUp = createAsyncThunk(
  "user/signup",
  async (userSignIn: IUserSignUp, { rejectWithValue }) => {
    try {
      const check = validSignUp(userSignIn)
      const response = await apiAuth.signup(userSignIn)
      const { token, user } = response.data.data
      window.localStorage.setItem("accessToken", token)
      window.localStorage.setItem("currentUser", JSON.stringify(user))
      apiClient.defaults.headers.common["Authorization"] = `Bearer ${token}`
      return response.data.data.user
    } catch (err: any) {
      const error: AxiosError<ValidationErrors> = err

      if (!error.response) {
        throw error
      }

      return rejectWithValue(error.response.data)
    }
  }
)
export const SignOut = createAsyncThunk("user/signout", async () => {
  window.localStorage.removeItem("currentUser")
  window.localStorage.removeItem("accessToken")
})

export const GetCurrentUser = createAsyncThunk(
  "user/currentUser",
  async (_, { rejectWithValue }) => {
    try {
      const response = await apiAuth.getCurrentUser()
      const user = response.data.data
      window.localStorage.setItem("currentUser", JSON.stringify(user))
      return user
    } catch (err: any) {
      const error: AxiosError<ValidationErrors> = err
      if (!error.response) {
        throw error
      }
      return rejectWithValue(error.response.data)
    }
  }
)

//slices
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    //   SignIn action
    builder.addCase(SignIn.fulfilled, (state, action) => {
      state.user = action.payload
    })
    builder.addCase(SignIn.rejected, (state, action: any) => {
      if (action.payload) {
        state.error = action.payload.message
      } else {
        state.error = action.error.message
      }
    })
    builder.addCase(SignUp.fulfilled, (state, action) => {
      state.user = action.payload
    })
    builder.addCase(SignUp.rejected, (state, action: any) => {
      if (action.payload) {
        state.error = action.payload.message
      } else {
        state.error = action.error.message
      }
    })
    builder.addCase(SignOut.fulfilled, (state) => {
      state.user = null
      state.error = null
    })
    builder.addCase(GetCurrentUser.fulfilled, (state, action) => {
      state.user = action.payload
    })
  }
})

export default authSlice.reducer
