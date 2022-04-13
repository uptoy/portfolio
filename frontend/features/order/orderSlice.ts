import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { AxiosError } from 'axios'

import * as OrderAPI from './orderApi'
import { Order, Status } from 'types'

interface InitialState {
  status: Status
  orders: Order[]
  error: string | null | undefined
  selectedOrder: null | Order
  selectedModal: null | string
}

const initialState: InitialState = {
  status: 'idle',
  orders: [],
  error: null,
  selectedOrder: null,
  selectedModal: null,
}

interface ValidationErrors {
  errors: Record<string, string>
  message: string
}

export const fetchOrder = createAsyncThunk(
  'order',
  async (_, { rejectWithValue }) => {
    try {
      const response = await OrderAPI.getOrder()
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

export const deleteOrder = createAsyncThunk(
  'order/delete',
  async (id: number, { rejectWithValue }) => {
    try {
      await OrderAPI.deleteOrder(id)
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

export const updateOrder = createAsyncThunk(
  'order/update',
  async (
    { id, fields }: { id: number; fields: { title: string } },
    { rejectWithValue },
  ) => {
    try {
      const response = await OrderAPI.updateOrder(id, fields)
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

export const addOrder = createAsyncThunk(
  'order/add',
  async (
    fields: {
      title: string
    },
    { rejectWithValue },
  ) => {
    try {
      const response = await OrderAPI.addOrder(fields)
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

export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    setSelectedModal: (state, action) => {
      state.selectedModal = action.payload
    },
    setSelectedOrder: (state, action) => {
      state.selectedOrder = action.payload
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchOrder.pending, (state) => {
      state.status = 'loading'
    })
    builder.addCase(fetchOrder.fulfilled, (state, action) => {
      state.orders = action.payload
      state.status = 'succeed'
    })
    builder.addCase(fetchOrder.rejected, (state, action: any) => {
      if (action.payload) {
        state.error = action.payload.message
      } else {
        state.error = action.error.message
      }
      state.status = 'failed'
    })
    builder.addCase(addOrder.fulfilled, (state, action) => {
      state.orders.push(action.payload)
    })
    builder.addCase(deleteOrder.fulfilled, (state, action) => {
      state.orders = state.orders.filter((order) => order.id !== action.payload)
    })
    builder.addCase(updateOrder.fulfilled, (state, action) => {
      state.orders = state.orders.map((order) =>
        order.id === action.payload.id
          ? { ...order, ...action.payload }
          : order,
      )
    })
  },
})

export const { setSelectedModal, setSelectedOrder } = orderSlice.actions

export default orderSlice.reducer
