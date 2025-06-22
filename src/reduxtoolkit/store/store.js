import { configureStore } from "@reduxjs/toolkit"
import MatchSlice from "../reducer/matchStartSlice"
const store=configureStore({
    reducer:{
        match:MatchSlice
    }
})

export default store