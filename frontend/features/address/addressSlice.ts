import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { AxiosError } from 'axios'

import * as AddressAPI from './addressApi'
import { Address, Status } from 'types'

interface InitialState {
  status: Status
  addresses: Address[]
  error: string | null | undefined
  selectedAddress: null | Address
  selectedModal: null | string
}

const initialState: InitialState = {
  status: 'idle',
  addresses: [],
  error: null,
  selectedAddress: null,
  selectedModal: null,
}

interface ValidationErrors {
  errors: Record<string, string>
  message: string
}

export const fetchAddress = createAsyncThunk(
  'address',
  async (_, { rejectWithValue }) => {
    try {
      const response = await AddressAPI.getAddress()
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

export const deleteAddress = createAsyncThunk(
  'address/delete',
  async (id: number, { rejectWithValue }) => {
    try {
      await AddressAPI.deleteAddress(id)
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

export const updateAddress = createAsyncThunk(
  'address/update',
  async (
    { id, fields }: { id: number; fields: { title: string } },
    { rejectWithValue },
  ) => {
    try {
      const response = await AddressAPI.updateAddress(id, fields)
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

export const addAddress = createAsyncThunk(
  'address/add',
  async (
    fields: {
      title: string
    },
    { rejectWithValue },
  ) => {
    try {
      const response = await AddressAPI.addAddress(fields)
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

export const addressSlice = createSlice({
  name: 'address',
  initialState,
  reducers: {
    setSelectedModal: (state, action) => {
      state.selectedModal = action.payload
    },
    setSelectedAddress: (state, action) => {
      state.selectedAddress = action.payload
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAddress.pending, (state) => {
      state.status = 'loading'
    })
    builder.addCase(fetchAddress.fulfilled, (state, action) => {
      state.addresses = action.payload
      state.status = 'succeed'
    })
    builder.addCase(fetchAddress.rejected, (state, action: any) => {
      if (action.payload) {
        state.error = action.payload.message
      } else {
        state.error = action.error.message
      }
      state.status = 'failed'
    })
    builder.addCase(addAddress.fulfilled, (state, action) => {
      state.addresses.push(action.payload)
    })
    builder.addCase(deleteAddress.fulfilled, (state, action) => {
      state.addresses = state.addresses.filter(
        (address) => address.id !== action.payload,
      )
    })
    builder.addCase(updateAddress.fulfilled, (state, action) => {
      state.addresses = state.addresses.map((address) =>
        address.id === action.payload.id
          ? { ...address, ...action.payload }
          : address,
      )
    })
  },
})

export const { setSelectedModal, setSelectedAddress } = addressSlice.actions

export default addressSlice.reducer
