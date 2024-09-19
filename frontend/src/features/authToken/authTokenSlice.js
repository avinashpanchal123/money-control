import { createSlice } from "@reduxjs/toolkit";

const authTokenSlice = createSlice({
    name: 'authToken',
    initialState: {
        value: null
    },
    reducers: {
        setAuthToken: (state, action) => {
            state.value = action.payload; 
        },
        removeToken: (state) => {
            state.value = null;  
        }
    }
})


export const { setAuthToken, removeToken } = authTokenSlice.actions;

export default authTokenSlice.reducer;
