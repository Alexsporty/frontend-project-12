import axios from "axios"
import { createAsyncThunk } from "@reduxjs/toolkit"
import { handleAxiosError } from "../utils/handleError"

export const loginRequest = async (credentials) => {
  const response = await axios.post("/api/v1/login", credentials)
  return response.data
}

export const signupRequest = async (credentials) => {
  const response = await axios.post("/api/v1/signup", credentials)
  return response.data
}

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (credentials, { rejectWithValue }) => {
    try {
      const data = await loginRequest(credentials)
      return data
    } catch (err) {
      return rejectWithValue(handleAxiosError(err))
    }
  },
)

export const signupUser = createAsyncThunk(
  "auth/signupUser",
  async (credentials, { rejectWithValue }) => {
    try {
      const data = await signupRequest(credentials)
      return data
    } catch (err) {
      return rejectWithValue(handleAxiosError(err))
    }
  },
)
