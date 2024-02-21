import { configureStore } from '@reduxjs/toolkit'
import userDataReducer from "../features/userData/userDataSlice.js"

export default configureStore({
  reducer: {
    userData: userDataReducer
  }
})