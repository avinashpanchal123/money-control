import { createSlice } from '@reduxjs/toolkit';

const categorySlice = createSlice({
    name: 'category',
    initialState: {
        value: []
    },
    reducers: {
        addCategory: (state, action) => {
            let payload = action.payload;
            state.value.push(payload)
        },
        editCategory: (state, action) => {
            let payload = action.payload;
            state.value = state.value.map((category) => 
                category.id == payload.id ? payload : category
            )
        }
    }
})


// Action creators are generated for each case reducer function
export const { addCategory, editCategory } = categorySlice.actions;

export default categorySlice.reducer;