import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export type User = {
  name: string | null
  age: number | null
  email: string | null
  token: string | null
  history: string[]
}

export type UserState = {
  user: User
}

export type UpdateUserPayload = User
export type AddHistoryPayload = string

const initialState: UserState = {
  user: {
    name: null,
    age: null,
    email: null,
    token: null,
    history: [],
  },
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  // HACK: reducerは肥大化したらファイル分けたくなるかも
  reducers: {
    updateUser(state, action: PayloadAction<UpdateUserPayload>) {
      state.user = action.payload
    },
    addHistory(state, action: PayloadAction<AddHistoryPayload>) {
      state.user.history.push(action.payload)
    },
    reset(): UserState {
      return initialState
    },
  },
})
