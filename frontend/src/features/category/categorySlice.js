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
        },
        deleteCategory : (state, action)=>{
            let id = action.payload;
            state.value = state.value.filter((category)=> category.id != id)
        }
    }
})


// Action creators are generated for each case reducer function
export const { addCategory, editCategory, deleteCategory } = categorySlice.actions;

export default categorySlice.reducer;