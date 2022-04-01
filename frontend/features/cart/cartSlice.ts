import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { AxiosError } from 'axios'

import * as CartAPI from './cartApi'
import { Cart } from 'types'

import { Status } from 'types'

interface InitialState {
  status: Status
  cart: Cart[]
  error: string | null | undefined
  selectedCart: null | Cart
  selectedModal: null | string
}

const initialState: InitialState = {
  status: 'idle',
  cart: [],
  error: null,
  selectedCart: null,
  selectedModal: null,
}

interface ValidationErrors {
  errors: Record<string, string>
  message: string
}

export const fetchCart = createAsyncThunk(
  'cart',
  async (_, { rejectWithValue }) => {
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
  },
)

export const deleteCartItem = createAsyncThunk(
  'cart/delete',
  async (id: string, { rejectWithValue }) => {
    try {
      await CartAPI.deleteCartItem(id)
      return id
    } catch (err) {
      const error: AxiosError<ValidationErrors> = err

      if (!error.response) {
        throw error
      }

      return rejectWithValue(error.response.data)
    }
  },
)

export const updateCartItem = createAsyncThunk(
  'cart/update',
  async (
    { id, fields }: { id: string; fields: { title: string } },
    { rejectWithValue },
  ) => {
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
  },
)

export const addCartItem = createAsyncThunk(
  'cart/add',
  async (
    fields: {
      title: string
    },
    { rejectWithValue },
  ) => {
    try {
      const response = await CartAPI.addCartItem(fields)
      return response.data.data
    } catch (err) {
      const error: AxiosError<ValidationErrors> = err

      if (!error.response) {
        throw error
      }

      return rejectWithValue(error.response.data)
    }
  },
)

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    setSelectedModal: (state, action) => {
      state.selectedModal = action.payload
    },
    setSelectedCart: (state, action) => {
      state.selectedCart = action.payload
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCart.pending, (state) => {
      state.status = 'loading'
    })
    builder.addCase(fetchCart.fulfilled, (state, action) => {
      state.cart = action.payload
      state.status = 'succeed'
    })
    builder.addCase(fetchCart.rejected, (state, action: any) => {
      if (action.payload) {
        state.error = action.payload.message
      } else {
        state.error = action.error.message
      }
      state.status = 'failed'
    })
    builder.addCase(addCartItem.fulfilled, (state, action) => {
      state.cart.push(action.payload)
    })
    builder.addCase(deleteCartItem.fulfilled, (state, action) => {
      state.cart = state.cart.filter(
        (cart_item) => cart_item.id !== action.payload,
      )
    })
    builder.addCase(updateCartItem.fulfilled, (state, action) => {
      state.cart = state.cart.map((cart_item) =>
        cart_item.id === action.payload.id
          ? { ...cart_item, ...action.payload }
          : cart_item,
      )
    })
  },
})

export const { setSelectedModal, setSelectedCart } = cartSlice.actions

export default cartSlice.reducer
