import { configureStore } from '@reduxjs/toolkit'
import userDataReducer from "../features/userData/userDataSlice.js"
import errorStateReducer from '../features/errorState/errorStateSlice.js'
import registerDataReducer from '../features/registerData/registerDataSlice.js'

export default configureStore({
  reducer: {
    userData: userDataReducer,
    errorState: errorStateReducer,
    registerData: registerDataReducer
  }
})