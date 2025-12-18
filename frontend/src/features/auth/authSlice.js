import { createSlice } from "@reduxjs/toolkit"
import { loginUser, signupUser } from "../../services/auth.js"

const authSlice = createSlice({
  name: "auth",
  initialState: {
    username: null,
    token: null,
    isAuthenticated: false,
    status: "idle", // 'loading', 'succeeded', 'failed'
    error: null,
  },
  reducers: {
    logoutUser(state) {
      state.username = null
      state.token = null
      state.isAuthenticated = false
      localStorage.removeItem("token")
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.status = "loading"
        state.error = null
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = "succeeded"
        state.username = action.payload.username
        state.token = action.payload.token
        localStorage.setItem("token", action.payload.token)
        state.isAuthenticated = true
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = "failed"
        state.error = action.payload
      })
      .addCase(signupUser.rejected, (state, action) => {
        state.status = "failed"
        state.error = action.payload
      })
  },
})
export const { logoutUser } = authSlice.actions
export default authSlice.reducer
