import {AxiosError} from "axios"
import * as CategoryAPI from "features/category/categoryApi"
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit"
import axios from "axios"
import type {RootState} from "app/store"
import {Category, Status} from "types"

interface ValidationErrors {
  errors: Record<string, string>
  message: string
}

// here we are typing the types for the state
// export type KanyeState = {
//   // data: {quote: string}
//   categories: Category[]
//   pending: boolean
//   error: boolean
// }

// const initialState: KanyeState = {
//   // data: {quote: "click that button"},
//   // categories: Category[],
//   categories: [],
//   pending: false,
//   error: false,
// }
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

export const fetchCategories = createAsyncThunk("categories", async (_, {rejectWithValue}) => {
  try {
    const response = await CategoryAPI.getCategories()
    const categories = response.data.jsons
    console.log("categories", categories)
    return categories
  } catch (err) {
    const error: AxiosError<ValidationErrors> = err

    if (!error.response) {
      throw error
    }

    return rejectWithValue(error.response.data)
  }
})

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
  // The `extraReducers` field lets the slice handle actions defined elsewhere, including actions generated by createAsyncThunk or in other slices.
  // Since this is an API call we have 3 possible outcomes: pending, fulfilled and rejected. We have made allocations for all 3 outcomes.
  // Doing this is good practice as we can tap into the status of the API call and give our users an idea of what's happening in the background.
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
  },
})

export default categoriesSlice.reducer

// interface InitialState {
//   status: Status
//   categories: Category[]
//   error: string | null | undefined
//   selectedCategory: null | Category
//   selectedModal: null | string
// }

// const initialState: InitialState = {
//   status: "idle",
//   categories: [],
//   error: null,
//   selectedCategory: null,
//   selectedModal: null,
// }

// interface ValidationErrors {
//   errors: Record<string, string>
//   message: string
// }

// export const fetchCategories = createAsyncThunk("categories", async (_, {rejectWithValue}) => {
//   try {
//     const response = await CategoryAPI.getCategories()
//     console.log("response", response)
//     return response.data.data
//   } catch (err) {
//     const error: AxiosError<ValidationErrors> = err

//     if (!error.response) {
//       throw error
//     }

//     return rejectWithValue(error.response.data)
//   }
// })

// export const deleteCategory = createAsyncThunk(
//   "categories/delete",
//   async (id: number, {rejectWithValue}) => {
//     try {
//       await CategoryAPI.deleteCategory(id)
//       return id
//     } catch (err) {
//       const error: AxiosError<ValidationErrors> = err

//       if (!error.response) {
//         throw error
//       }

//       return rejectWithValue(error.response.data)
//     }
//   }
// )

// export const updateCategory = createAsyncThunk(
//   "categories/update",
//   async ({id, fields}: {id: number; fields: {category_name: string}}, {rejectWithValue}) => {
//     try {
//       const response = await CategoryAPI.updateCategory(id, fields)
//       return response.data.data
//     } catch (err) {
//       const error: AxiosError<ValidationErrors> = err

//       if (!error.response) {
//         throw error
//       }

//       return rejectWithValue(error.response.data)
//     }
//   }
// )

// export const addCategory = createAsyncThunk(
//   "categories/add",
//   async (
//     fields: {
//       category_name: string
//     },
//     {rejectWithValue}
//   ) => {
//     try {
//       const response = await CategoryAPI.addCategory(fields)
//       return response.data.data
//     } catch (err) {
//       const error: AxiosError<ValidationErrors> = err

//       if (!error.response) {
//         throw error
//       }

//       return rejectWithValue(error.response.data)
//     }
//   }
// )

// export const categorySlice = createSlice({
//   name: "categories",
//   initialState,
//   reducers: {
//     setSelectedModal: (state, action) => {
//       state.selectedModal = action.payload
//     },
//     setSelectedCategory: (state, action) => {
//       state.selectedCategory = action.payload
//     },
//   },
//   extraReducers: (builder) => {
//     builder.addCase(fetchCategories.pending, (state) => {
//       state.status = "loading"
//     })
//     builder.addCase(fetchCategories.fulfilled, (state, action) => {
//       state.categories = action.payload
//       state.status = "succeed"
//     })
//     builder.addCase(fetchCategories.rejected, (state, action: any) => {
//       if (action.payload) {
//         state.error = action.payload.message
//       } else {
//         state.error = action.error.message
//       }
//       state.status = "failed"
//     })
//     builder.addCase(addCategory.fulfilled, (state, action) => {
//       state.categories.push(action.payload)
//     })
//     builder.addCase(deleteCategory.fulfilled, (state, action) => {
//       state.categories = state.categories.filter((category) => category.id !== action.payload)
//     })
//     builder.addCase(updateCategory.fulfilled, (state, action) => {
//       state.categories = state.categories.map((category) =>
//         category.id === action.payload.id ? {...category, ...action.payload} : category
//       )
//     })
//   },
// })

// export const {setSelectedModal, setSelectedCategory} = categorySlice.actions

// export default categorySlice.reducer
