import { createSlice } from "@reduxjs/toolkit";
import { getAllBlogs, createBlog, updateBlog, getBlogById, deleteBlog } from "./blogThunk";

const initialState = {
  user: null,
  blogList: [],
  BlogById: [],
  token: null,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.error = null;
      localStorage.removeItem("users");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllBlogs.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getAllBlogs.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.blogList = action.payload;
      })
      .addCase(getAllBlogs.rejected, (state, action) => {
        state.loading = "failed";
        state.error = action.error.message;
      })

      .addCase(createBlog.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createBlog.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(createBlog.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      //update Blog
      .addCase(updateBlog.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateBlog.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(updateBlog.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      //view blog
      .addCase(getBlogById.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getBlogById.fulfilled, (state, action) => {
        state.status = "Succeeded";
        state.BlogById = action.payload;
      })
      .addCase(getBlogById.rejected, (state, action) => {
        state.loading = "failed";
        state.error = action.error.message;
      })

      //delete blog
      .addCase(deleteBlog.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteBlog.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.blogList = state.blogList.filter(
          (blog) => blog.id !== action.payload
        );
      })
      .addCase(deleteBlog.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || action.error.message;
      })
  },
});

export const { blogList } = authSlice.actions;
export default authSlice.reducer;
