import { RootState } from "app/store"
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"
import * as apiBlog from "services/apiBlog"

export type IBlog = {
  _id: string
  title: string | undefined
  author: string | undefined
}
type InitialState = {
  blogs: IBlog[]
  error: string | null | undefined
}
const blogs: IBlog[] = [
  {
    _id: "1",
    title: "1984",
    author: "George Orwell"
  },
  {
    _id: "2",
    title: "Harry Potter and the Philosopher's Stone",
    author: "J. K. Rowling"
  },
  {
    _id: "3",
    title: "The Lord of the Rings",
    author: "J.R.R Tolkien"
  }
]

const initialState: InitialState = {
  blogs: blogs,
  error: null
}

export const createBlog = createAsyncThunk(
  "blog/create",
  async (blogData: IBlog, { rejectWithValue }) => {
    try {
      const response = await apiBlog.createBlog(blogData)
      return response.data
    } catch (error: any) {
      if (!error.response) {
        throw error
      }
      return rejectWithValue(error.response.data)
    }
  }
)
export const getBlogs = createAsyncThunk(
  "blog/getBlogs",
  async (blogs: IBlog[], { rejectWithValue }) => {
    try {
      const response = await apiBlog.getBlogs()
      return response.data
    } catch (error: any) {
      if (!error.response) {
        return error
      }
      return rejectWithValue(error.response.data)
    }
  }
)
export const getBlogDetail = createAsyncThunk(
  "blog/blogDetail",
  async (_id: string, { rejectWithValue }) => {
    try {
      const response = await apiBlog.getBlogDetail(_id)
      return response.data
    } catch (error: any) {
      if (!error.response) {
        throw error
      }
      return rejectWithValue(error.response.data)
    }
  }
)
export const updateBlog = createAsyncThunk(
  "blog/updateBlog",
  async (blog: IBlog, { rejectWithValue }) => {
    try {
      const { _id } = blog
      const response = await apiBlog.updateBlog(_id, blog)
      return response.data
    } catch (error: any) {
      if (!error.response) {
        throw error
      }
      return rejectWithValue(error.response.data)
    }
  }
)
export const deleteBlog = createAsyncThunk(
  "blog/deleteBlog",
  async (_id: string, { rejectWithValue }) => {
    try {
      const response = await apiBlog.deleteBlog(_id)
      return response.data
    } catch (error: any) {
      if (!error.response) {
        throw error
      }
      return rejectWithValue(error.response.data)
    }
  }
)

export const blogSlice = createSlice({
  name: "blog",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(createBlog.fulfilled, (state, action) => {
      state.blogs = action.payload
    })
    builder.addCase(createBlog.rejected, (state, action: any) => {
      if (action.payload) {
        state.error = action.payload.message
      } else {
        state.error = action.error.message
      }
    })
    builder.addCase(getBlogs.fulfilled, (state, action) => {
      state.blogs = action.payload
    })
    builder.addCase(getBlogs.rejected, (state, action: any) => {
      if (action.payload) {
        state.error = action.payload.message
      } else {
        state.error = action.error.message
      }
    })
    builder.addCase(getBlogDetail.fulfilled, (state, action) => {
      state.blogs = action.payload
    })
    builder.addCase(getBlogDetail.rejected, (state, action: any) => {
      if (action.payload) {
        state.error = action.payload.message
      } else {
        state.error = action.error.message
      }
    })
    builder.addCase(updateBlog.fulfilled, (state, action) => {
      state.blogs = action.payload
    })
    builder.addCase(updateBlog.rejected, (state, action: any) => {
      if (action.payload) {
        state.error = action.payload.message
      } else {
        state.error = action.error.message
      }
    })
    builder.addCase(deleteBlog.fulfilled, (state, action) => {
      state.blogs = action.payload
    })
    builder.addCase(deleteBlog.rejected, (state, action: any) => {
      if (action.payload) {
        state.error = action.payload.message
      } else {
        state.error = action.error.message
      }
    })
  }
})

export const selectBlogs = (state: RootState) => state.blog.blogs
export default blogSlice.reducer
