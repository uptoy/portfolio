import {createSlice, createAsyncThunk} from "@reduxjs/toolkit"
import {AxiosError} from "axios"

import * as CartAPI from "./cartApi"
import {Cart} from "types"

import {Status} from "types"

interface InitialState {
  status: Status
  cart: Cart[]
  error: string | null | undefined
  selectedCart: null | Cart
  selectedModal: null | string
}

const initialState: InitialState = {
  status: "idle",
  cart: [],
  error: null,
  selectedCart: null,
  selectedModal: null,
}

interface ValidationErrors {
  errors: Record<string, string>
  message: string
}

export const fetchCart = createAsyncThunk("cart", async (_, {rejectWithValue}) => {
  try {
    const response = await CartAPI.getCart()
    return response.data.data
  } catch (err) {
    const error: AxiosError<ValidationErrors> = err

    if (!error.response) {
      throw error
    }

    return rejectWithValue(error.response.data)
  }
})

export const deleteCart = createAsyncThunk("cart/delete", async (id: number, {rejectWithValue}) => {
  try {
    await CartAPI.deleteCart
    return id
  } catch (err) {
    const error: AxiosError<ValidationErrors> = err

    if (!error.response) {
      throw error
    }

    return rejectWithValue(error.response.data)
  }
})

export const updateCart = createAsyncThunk(
  "cart/update",
  async ({id, fields}: {id: number; fields: {title: string}}, {rejectWithValue}) => {
    try {
      const response = await CartAPI.updateCart(id, fields)
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

export const addCart = createAsyncThunk(
  "cart/add",
  async (
    fields: {
      title: string
    },
    {rejectWithValue}
  ) => {
    try {
      const response = await CartAPI.addCart(fields)
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

export const productsSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setSelectedModal: (state, action) => {
      state.selectedModal = action.payload
    },
    setSelectedProduct: (state, action) => {
      state.selectedCart = action.payload
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCart.pending, (state) => {
      state.status = "loading"
    })
    builder.addCase(fetchCart.fulfilled, (state, action) => {
      state.cart = action.payload
      state.status = "succeed"
    })
    builder.addCase(fetchCart.rejected, (state, action: any) => {
      if (action.payload) {
        state.error = action.payload.message
      } else {
        state.error = action.error.message
      }
      state.status = "failed"
    })
    builder.addCase(addCart.fulfilled, (state, action) => {
      state.cart.push(action.payload)
    })
    builder.addCase(deleteCart.fulfilled, (state, action) => {
      state.cart = state.cart.filter((c) => c.id !== action.payload)
    })
    builder.addCase(updateCart.fulfilled, (state, action) => {
      state.cart = state.cart.map((c) =>
        c.id === action.payload.id ? {...c, ...action.payload} : c
      )
    })
  },
})

export const {setSelectedModal, setSelectedProduct} = productsSlice.actions

export default productsSlice.reducer
