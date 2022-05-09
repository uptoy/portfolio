import {createSlice, createAsyncThunk} from "@reduxjs/toolkit"
import {AxiosError} from "axios"
import * as UserAPI from "./userApi"
import {User, Status} from "@types"

interface InitialState {
  status: Status
  users: User[]
  user: User
  error: string | null | undefined
  selectedUser: null | User
  selectedModal: null | string
}

const initialState: InitialState = {
  status: "idle",
  users: [],
  user: {
    uid: "",
    username: "",
    email: "",
    profile_url: "",
  },
  error: null,
  selectedUser: null,
  selectedModal: null,
}

interface ValidationErrors {
  errors: Record<string, string>
  message: string
}

export const fetchUsers = createAsyncThunk("users", async (_, {rejectWithValue}) => {
  try {
    const response = await UserAPI.getUsers()
    return response.data.data
  } catch (err) {
    if (err instanceof Error) {
      console.log(err)
      return rejectWithValue(err)
    }
    console.log(err)
  }
})

export const fetchUserById = createAsyncThunk(
  "users/get",
  async (uid: string, {rejectWithValue}) => {
    try {
      const response = await UserAPI.getUserFindByID(uid)
      // console.log(response.data.data)
      return response.data.data
    } catch (err) {
      if (err instanceof Error) {
        console.log(err)
        return rejectWithValue(err)
      }
      console.log(err)
    }
  }
)

export const deleteUser = createAsyncThunk(
  "users/delete",
  async (uid: string, {rejectWithValue}) => {
    try {
      await UserAPI.deleteUser(uid)
      return uid
    } catch (err) {
      if (err instanceof Error) {
        console.log(err)
        return rejectWithValue(err)
      }
      console.log(err)
    }
  }
)

export const updateUser = createAsyncThunk(
  "users/update",
  async ({uid, fields}: {uid: string; fields: User}, {rejectWithValue}) => {
    try {
      const response = await UserAPI.updateUser(uid, fields)
      return response.data.data
    } catch (err) {
      if (err instanceof Error) {
        console.log(err)
        return rejectWithValue(err)
      }
      console.log(err)
    }
  }
)

export const addUser = createAsyncThunk("users/add", async (fields: User, {rejectWithValue}) => {
  try {
    const response = await UserAPI.addUser(fields)
    return response.data.data
  } catch (err) {
    if (err instanceof Error) {
      console.log(err)
      return rejectWithValue(err)
    }
    console.log(err)
  }
})

export const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setSelectedModal: (state, action) => {
      state.selectedModal = action.payload
    },
    setSelectedUser: (state, action) => {
      state.selectedUser = action.payload
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUsers.pending, (state) => {
      state.status = "loading"
    })
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      state.users = action.payload
      state.status = "succeed"
    })
    builder.addCase(fetchUsers.rejected, (state, action: any) => {
      if (action.payload) {
        state.error = action.payload.message
      } else {
        state.error = action.error.message
      }
      state.status = "failed"
    })
    builder.addCase(fetchUserById.pending, (state) => {
      state.status = "loading"
    })
    builder.addCase(fetchUserById.fulfilled, (state, action) => {
      state.user = action.payload
    })
    builder.addCase(fetchUserById.rejected, (state, action: any) => {
      if (action.payload) {
        state.error = action.payload.message
      } else {
        state.error = action.error.message
      }
      state.status = "failed"
    })
    // builder.addCase(fetchProductById.fulfilled, (state, action) => {
    //   console.log(state.products)
    //   // state.products = state.products.filter((product) => product.id !== action.payload)
    // })
    builder.addCase(addUser.fulfilled, (state, action) => {
      state.users.push(action.payload)
    })
    builder.addCase(deleteUser.fulfilled, (state, action) => {
      state.users = state.users.filter((user) => user.uid !== action.payload)
    })
    builder.addCase(updateUser.fulfilled, (state, action) => {
      state.users = state.users.map((user) =>
        user.uid === action.payload.id ? {...user, ...action.payload} : user
      )
    })
  },
})

export const {setSelectedModal, setSelectedUser} = usersSlice.actions

export default usersSlice.reducer
