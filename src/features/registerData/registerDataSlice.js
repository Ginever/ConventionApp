import { createSlice } from "@reduxjs/toolkit";

const initialState ={
    "1st puke": [{
        name: 'Hello'
    },
    {
        name: 'World'
    }],
}

export const registerDataSlice = createSlice({
    name: 'registerData',
    initialState,
    reducers : {
        addRegistrationData: (state, action) => {
            state = action.payload;
        },
    }
})

export const {
    addRegistrationData,
} = registerDataSlice.actions;

export const selectRegistrationData = state => state.registerData

export default registerDataSlice.reducer;