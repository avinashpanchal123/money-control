import { createSlice } from '@reduxjs/toolkit'

const TransactionSlice = createSlice({
    name: 'transaction',
    initialState: {
        value: []
    },
    reducers: {
        addTransaction: (state, action) => {
            let payload = action.payload;
            state.value.push(payload)
        },
        editTransaction: (state, action) => {
            let payload = action.payload;
            state.value = state.value.map((transaction) => 
                 transaction.id == payload.id ? payload : transaction
            )
        }
    }
});


// Action creators are generated for each case reducer function
export const { addTransaction, editTransaction } = TransactionSlice.actions;

export default TransactionSlice.reducer;