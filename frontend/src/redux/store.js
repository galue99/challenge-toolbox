import { configureStore } from '@reduxjs/toolkit'
import filesReducer from "./reducers/filesReducer";

export default configureStore({
  reducer: {
    files: filesReducer
  }
})
