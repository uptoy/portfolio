import {createSlice, createAsyncThunk} from "@reduxjs/toolkit"
import {AxiosError} from "axios"

import * as WishlistAPI from "./wishlistApi"
import {Wishlist, Status} from "types"

interface InitialState {
  status: Status
  wishlist: Wishlist[]
  error: string | null | undefined
  selectedWishlist: null | Wishlist
  selectedModal: null | string
}

const initialState: InitialState = {
  status: "idle",
  wishlist: [],
  error: null,
  selectedWishlist: null,
  selectedModal: null,
}

interface ValidationErrors {
  errors: Record<string, string>
  message: string
}

export const fetchWishlist = createAsyncThunk("wishlist", async (_, {rejectWithValue}) => {
  try {
    const response = await WishlistAPI.getWishlist()
    return response.data.data
  } catch (err) {
    const error: AxiosError<ValidationErrors> = err

    if (!error.response) {
      throw error
    }

    return rejectWithValue(error.response.data)
  }
})

export const deleteWishlist = createAsyncThunk(
  "wishlist/delete",
  async (id: number, {rejectWithValue}) => {
    try {
      await WishlistAPI.deleteWishlist(id)
      return id
    } catch (err) {
      const error: AxiosError<ValidationErrors> = err

      if (!error.response) {
        throw error
      }

      return rejectWithValue(error.response.data)
    }
  }
)

export const updateWishlist = createAsyncThunk(
  "wishlist/update",
  async ({id, fields}: {id: number; fields: {title: string}}, {rejectWithValue}) => {
    try {
      const response = await WishlistAPI.updateWishlist(id, fields)
      return response.data.data
    } catch (err) {
      const error: AxiosError<ValidationErrors> = err

      if (!error.response) {
        throw error
      }

      return rejectWithValue(error.response.data)
    }
  }
)

export const addWishlist = createAsyncThunk(
  "wishlist/add",
  async (
    fields: {
      title: string
    },
    {rejectWithValue}
  ) => {
    try {
      const response = await WishlistAPI.addWishlist(fields)
      return response.data.data
    } catch (err) {
      const error: AxiosError<ValidationErrors> = err

      if (!error.response) {
        throw error
      }

      return rejectWithValue(error.response.data)
    }
  }
)

export const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    setSelectedModal: (state, action) => {
      state.selectedModal = action.payload
    },
    setSelectedWishlist: (state, action) => {
      state.selectedWishlist = action.payload
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchWishlist.pending, (state) => {
      state.status = "loading"
    })
    builder.addCase(fetchWishlist.fulfilled, (state, action) => {
      state.wishlist = action.payload
      state.status = "succeed"
    })
    builder.addCase(fetchWishlist.rejected, (state, action: any) => {
      if (action.payload) {
        state.error = action.payload.message
      } else {
        state.error = action.error.message
      }
      state.status = "failed"
    })
    builder.addCase(addWishlist.fulfilled, (state, action) => {
      state.wishlist.push(action.payload)
    })
    builder.addCase(deleteWishlist.fulfilled, (state, action) => {
      state.wishlist = state.wishlist.filter((product) => product.id !== action.payload)
    })
    builder.addCase(updateWishlist.fulfilled, (state, action) => {
      state.wishlist = state.wishlist.map((product) =>
        product.id === action.payload.id ? {...product, ...action.payload} : product
      )
    })
  },
})

export const {setSelectedModal, setSelectedWishlist} = wishlistSlice.actions

export default wishlistSlice.reducer
