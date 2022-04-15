import {createSlice, createAsyncThunk} from "@reduxjs/toolkit"
import {AxiosError} from "axios"
import * as ProductAPI from "./productApi"
import {Product} from "types"
import {Status} from "types"

interface InitialState {
  status: Status
  products: Product[]
  error: string | null | undefined
  selectedProduct: null | Product
  selectedModal: null | string
}

const initialState: InitialState = {
  status: "idle",
  products: [],
  error: null,
  selectedProduct: null,
  selectedModal: null,
}

interface ValidationErrors {
  errors: Record<string, string>
  message: string
}

export const fetchProducts = createAsyncThunk("products", async (_, {rejectWithValue}) => {
  try {
    const response = await ProductAPI.getProducts()
    return response.data.data
  } catch (err) {
    const error: AxiosError<ValidationErrors> = err

    if (!error.response) {
      throw error
    }

    return rejectWithValue(error.response.data)
  }
})

export const deleteProduct = createAsyncThunk(
  "products/delete",
  async (id: number, {rejectWithValue}) => {
    try {
      await ProductAPI.deleteProduct(id)
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

export const updateProduct = createAsyncThunk(
  "products/update",
  async ({id, fields}: {id: number; fields: Product}, {rejectWithValue}) => {
    try {
      const response = await ProductAPI.updateProduct(id, fields)
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

export const addProduct = createAsyncThunk(
  "products/add",
  async (fields: Product, {rejectWithValue}) => {
    try {
      const response = await ProductAPI.addProduct(fields)
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
  name: "products",
  initialState,
  reducers: {
    setSelectedModal: (state, action) => {
      state.selectedModal = action.payload
    },
    setSelectedProduct: (state, action) => {
      state.selectedProduct = action.payload
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchProducts.pending, (state) => {
      state.status = "loading"
    })
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      state.products = action.payload
      state.status = "succeed"
    })
    builder.addCase(fetchProducts.rejected, (state, action: any) => {
      if (action.payload) {
        state.error = action.payload.message
      } else {
        state.error = action.error.message
      }
      state.status = "failed"
    })
    builder.addCase(addProduct.fulfilled, (state, action) => {
      state.products.push(action.payload)
    })
    builder.addCase(deleteProduct.fulfilled, (state, action) => {
      state.products = state.products.filter((product) => product.id !== action.payload)
    })
    builder.addCase(updateProduct.fulfilled, (state, action) => {
      state.products = state.products.map((product) =>
        product.id === action.payload.id ? {...product, ...action.payload} : product
      )
    })
  },
})

export const {setSelectedModal, setSelectedProduct} = productsSlice.actions

export default productsSlice.reducer
