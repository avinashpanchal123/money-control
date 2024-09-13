import {configureStore} from "@reduxjs/toolkit";
import categorySlice from "../features/category/categorySlice";
import transactionSlice from "../features/transaction/transactionSlice";

const store = configureStore({
    reducer : {
        category : categorySlice,
        transaction : transactionSlice,
    }
})

export default store;