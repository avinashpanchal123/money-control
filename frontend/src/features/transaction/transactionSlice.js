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
        setTransactions : (state, action)=>{
            state.value = action.payload;
        },
        editTransaction: (state, action) => {
            let payload = action.payload;
            state.value = state.value.map((transaction) => 
                 transaction.id == payload.id ? payload : transaction
            )
        },
        deleteTransaction : (state, action)=>{
            let id = action.payload;
            state.value = state.value.filter((transaction)=> transaction.id != id)
        }
    }
});


// Action creators are generated for each case reducer function
export const { addTransaction, editTransaction, deleteTransaction, setTransactions } = TransactionSlice.actions;

export default TransactionSlice.reducer;