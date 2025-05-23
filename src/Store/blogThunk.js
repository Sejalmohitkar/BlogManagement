import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";

// Login Thunk
export const getAllBlogs = createAsyncThunk(
  "auth/getAllBlogs",
  async (_, { rejectWithValue }) => {
    try {
      const user = JSON.parse(localStorage.getItem("currentUser"));
      const token = user?.token;

      const response = await axios.get(
        `${BASE_URL}/api/blogs/`,
        {
          headers: {
            Authorization: token,
          },
        }
      );
      console.log(response.data);

      return response.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to get data"
      );
    }
  }
);

//AddBlog
export const createBlog = createAsyncThunk(
  "auth/createBlog",
  async (credentials, { rejectWithValue }) => {
    const adminToken = JSON.parse(localStorage.getItem("currentUser"))?.token;
    try {
      const response = await axios.post(
        `${BASE_URL}/api/blogs/`,
        credentials,
        {
          headers: {
            Authorization: adminToken,
          },
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Registration failed");
    }
  }
);

//UpdateBlog
export const updateBlog = createAsyncThunk(
  'blog/updateBlog',
  async ({ id, updatedData }, { rejectWithValue }) => {
    const user = JSON.parse(localStorage.getItem("currentUser"));
    const token = user?.token;

    try {
      const response = await axios.put(
        `${BASE_URL}/api/blogs/${id}`, 
        updatedData,                                
        {
          headers: {
            Authorization: token,
          },
        }
      );
      console.log('Updated blog:', response.data);
      return response.data;
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Update blog failed';
      return rejectWithValue(errorMessage);
    }
  }
);

//view Blog
export const getBlogById = createAsyncThunk(
  'doctor/getBlogById',
  async (id, { rejectWithValue }) => {
    const user = JSON.parse(localStorage.getItem("currentUser"));
    const token = user?.token;
    try {
      const response = await axios.get(
        `${BASE_URL}/api/blogs/${id}`,
        {
          headers: {
            Authorization: token,
          },
        }
      );
      console.log(response.data);
      return response.data;
    } catch (err) {
      const errorMessage =
        err.response?.data?.message || "'get data by id failed";
      return rejectWithValue(errorMessage);
    }
  }
);

//delete blog
export const deleteBlog = createAsyncThunk(
  "auth/deleteBlog",
  async (id, { rejectWithValue }) => {
    const token = JSON.parse(localStorage.getItem("currentUser"))?.token;
    try {
      const response = await axios.delete(
        `${BASE_URL}/api/blogs/${id}`,
        {
          headers: {
            Authorization: token,
          },
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Delete failed");
    }
  }
);