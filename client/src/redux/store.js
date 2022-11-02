import {combineReducers,configureStore} from "@reduxjs/toolkit"
import urlSlice from "./urlSlice"

const rootReducer = combineReducers({
    Urls:urlSlice
})

const store= configureStore({
    reducer:rootReducer
})

export default store