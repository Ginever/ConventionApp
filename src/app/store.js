import { configureStore } from '@reduxjs/toolkit'
import userDataReducer from "../features/userData/userDataSlice.js"
import errorStateReducer from '../features/errorState/errorStateSlice.js'

export default configureStore({
  reducer: {
    userData: userDataReducer,
    errorState: errorStateReducer,
  }
})