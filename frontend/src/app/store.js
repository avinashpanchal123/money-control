import {configureStore} from "@reduxjs/toolkit";
import categorySlice from "../features/category/categorySlice";
import transactionSlice from "../features/transaction/transactionSlice";
import authTokenSlice from  "../features/authToken/authTokenSlice"

const store = configureStore({
    reducer : {
        category : categorySlice,
        transaction : transactionSlice,
        authToken : authTokenSlice
    }
})

export default store;