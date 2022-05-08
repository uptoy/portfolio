import {AxiosError} from "axios"
import * as CategoryAPI from "features/category/categoryApi"
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit"
import axios from "axios"
import type {RootState} from "app/store"
import {Category, Status} from "@types"

interface InitialState {
  status: Status
  categories: Category[]
  error: string | null | undefined
  selectedCategory: null | Category
  selectedModal: null | string
}

const initialState: InitialState = {
  status: "idle",
  categories: [],
  error: null,
  selectedCategory: null,
  selectedModal: null,
}

interface ValidationErrors {
  errors: Record<string, string>
  message: string
}

export const fetchCategories = createAsyncThunk("categories", async (_, {rejectWithValue}) => {
  try {
    const response = await CategoryAPI.getCategories()
    const categories = response.data.data
    console.log("categories", categories)
    return categories
  } catch (err) {
    if (err instanceof Error) {
      console.log("Failed", err.message)
    } else {
      console.log("Unknown Failure", err)
    }
    return rejectWithValue(err)
  }
})
export const deleteCategory = createAsyncThunk(
  "categories/delete",
  async (id: number, {rejectWithValue}) => {
    try {
      await CategoryAPI.deleteCategory(id)
      return id
    } catch (err) {
      if (err instanceof Error) {
        console.log("Failed", err.message)
      } else {
        console.log("Unknown Failure", err)
      }
      return rejectWithValue(err)
    }
  }
)

export const updateCategory = createAsyncThunk(
  "categories/update",
  async ({id, fields}: {id: number; fields: {category_name: string}}, {rejectWithValue}) => {
    try {
      const response = await CategoryAPI.updateCategory(id, fields)
      return response.data.data
    } catch (err) {
      if (err instanceof Error) {
        console.log("Failed", err.message)
      } else {
        console.log("Unknown Failure", err)
      }
      return rejectWithValue(err)
    }
  }
)

export const addCategory = createAsyncThunk(
  "categories/add",
  async (
    fields: {
      category_name: string
    },
    {rejectWithValue}
  ) => {
    try {
      const response = await CategoryAPI.addCategory(fields)
      return response.data.data
    } catch (err) {
      if (err instanceof Error) {
        console.log("Failed", err.message)
      } else {
        console.log("Unknown Failure", err)
      }
      return rejectWithValue(err)
    }
  }
)

export const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {
    setSelectedModal: (state, action) => {
      state.selectedModal = action.payload
    },
    setSelectedCategory: (state, action) => {
      state.selectedCategory = action.payload
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCategories.pending, (state) => {
      state.status = "loading"
    })
    builder.addCase(fetchCategories.fulfilled, (state, action) => {
      state.categories = action.payload
      state.status = "succeed"
    })
    builder.addCase(fetchCategories.rejected, (state, action: any) => {
      if (action.payload) {
        state.error = action.payload.message
      } else {
        state.error = action.error.message
      }
      state.status = "failed"
    })
    builder.addCase(addCategory.fulfilled, (state, action) => {
      state.categories.push(action.payload)
    })
    builder.addCase(deleteCategory.fulfilled, (state, action) => {
      state.categories = state.categories.filter((category) => category.id !== action.payload)
    })
    builder.addCase(updateCategory.fulfilled, (state, action) => {
      state.categories = state.categories.map((category) =>
        category.id === action.payload.id ? {...category, ...action.payload} : category
      )
    })
  },
})

export const {setSelectedModal, setSelectedCategory} = categoriesSlice.actions
export default categoriesSlice.reducer