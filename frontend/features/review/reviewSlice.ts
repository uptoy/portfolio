import {createSlice, createAsyncThunk} from "@reduxjs/toolkit"
import {AxiosError} from "axios"

import * as ReviewAPI from "./reviewApi"
import {Review, Status} from "types"

interface InitialState {
  status: Status
  reviews: Review[]
  error: string | null | undefined
  selectedReview: null | Review
  selectedModal: null | string
}

const initialState: InitialState = {
  status: "idle",
  reviews: [],
  error: null,
  selectedReview: null,
  selectedModal: null,
}

interface ValidationErrors {
  errors: Record<string, string>
  message: string
}

export const fetchReview = createAsyncThunk("review", async (_, {rejectWithValue}) => {
  try {
    const response = await ReviewAPI.getReview()
    return response.data.data
  } catch (err) {
    const error: AxiosError<ValidationErrors> = err

    if (!error.response) {
      throw error
    }

    return rejectWithValue(error.response.data)
  }
})

export const deleteReview = createAsyncThunk(
  "review/delete",
  async (id: number, {rejectWithValue}) => {
    try {
      await ReviewAPI.deleteReview(id)
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

export const updateReview = createAsyncThunk(
  "review/update",
  async ({id, fields}: {id: number; fields: {title: string}}, {rejectWithValue}) => {
    try {
      const response = await ReviewAPI.updateReview(id, fields)
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

export const addReview = createAsyncThunk(
  "review/add",
  async (
    fields: {
      title: string
    },
    {rejectWithValue}
  ) => {
    try {
      const response = await ReviewAPI.addReview(fields)
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

export const reviewSlice = createSlice({
  name: "review",
  initialState,
  reducers: {
    setSelectedModal: (state, action) => {
      state.selectedModal = action.payload
    },
    setSelectedReview: (state, action) => {
      state.selectedReview = action.payload
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchReview.pending, (state) => {
      state.status = "loading"
    })
    builder.addCase(fetchReview.fulfilled, (state, action) => {
      state.reviews = action.payload
      state.status = "succeed"
    })
    builder.addCase(fetchReview.rejected, (state, action: any) => {
      if (action.payload) {
        state.error = action.payload.message
      } else {
        state.error = action.error.message
      }
      state.status = "failed"
    })
    builder.addCase(addReview.fulfilled, (state, action) => {
      state.reviews.push(action.payload)
    })
    builder.addCase(deleteReview.fulfilled, (state, action) => {
      state.reviews = state.reviews.filter((review) => review.id !== action.payload)
    })
    builder.addCase(updateReview.fulfilled, (state, action) => {
      state.reviews = state.reviews.map((review) =>
        review.id === action.payload.id ? {...review, ...action.payload} : review
      )
    })
  },
})

export const {setSelectedModal, setSelectedReview} = reviewSlice.actions

export default reviewSlice.reducer
