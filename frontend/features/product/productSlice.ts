

import {createSlice, createAsyncThunk} from "@reduxjs/toolkit"
import {AxiosError} from "axios"
import * as ProductAPI from "./productApi"
import {Product} from "@types"
import {Status} from "@types"
import toast from "react-hot-toast"

interface InitialState {
  status: Status
  products: Product[]
  product: Product
  error: string | null | undefined
  selectedProduct: null | Product
  selectedModal: null | string
}

const initialState: InitialState = {
  status: "idle",
  products: [],
  product: {
    product_name: "",
    slug: "",
    brand: "",
    price: 0,
    count_in_stock: 0,
    category_id: 1,
    description: "",
    images: [],
  },
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
    if (err instanceof Error) {
      toast.error(err.message)
      console.log("Failed", err.message)
      return rejectWithValue(err.message)
    } else {
      console.log("Unknown Failure", err)
      return rejectWithValue(err)
    }
  }
})

export const fetchProductById = createAsyncThunk(
  "products/get",
  async (id: number, {rejectWithValue}) => {
    try {
      const response = await ProductAPI.getProductFindByID(id)
      // console.log(response.data.data)
      return response.data.data
    } catch (err) {
      if (err instanceof Error) {
        toast.error(err.message)
        console.log("Failed", err.message)
        return rejectWithValue(err.message)
      } else {
        console.log("Unknown Failure", err)
        return rejectWithValue(err)
      }
    }
  }
)

export const deleteProduct = createAsyncThunk(
  "products/delete",
  async (id: number, {rejectWithValue}) => {
    try {
      await ProductAPI.deleteProduct(id)
      return id
    } catch (err) {
      if (err instanceof Error) {
        toast.error(err.message)
        console.log("Failed", err.message)
        return rejectWithValue(err.message)
      } else {
        console.log("Unknown Failure", err)
        return rejectWithValue(err)
      }
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
      if (err instanceof Error) {
        toast.error(err.message)
        console.log("Failed", err.message)
        return rejectWithValue(err.message)
      } else {
        console.log("Unknown Failure", err)
        return rejectWithValue(err)
      }
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
      if (err instanceof Error) {
        toast.error(err.message)
        console.log("Failed", err.message)
        return rejectWithValue(err.message)
      } else {
        console.log("Unknown Failure", err)
        return rejectWithValue(err)
      }
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
    builder.addCase(fetchProductById.pending, (state) => {
      state.status = "loading"
    })
    builder.addCase(fetchProductById.fulfilled, (state, action) => {
      state.product = action.payload
    })
    builder.addCase(fetchProductById.rejected, (state, action: any) => {
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
