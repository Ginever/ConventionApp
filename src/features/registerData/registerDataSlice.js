import { createSlice } from "@reduxjs/toolkit";

const initialState ={
}

export const registerDataSlice = createSlice({
    name: 'registerData',
    initialState,
    reducers : {
        addRegistrationData: (state, action) => {
            console.log(action.payload.conventionName);
            state[action.payload.conventionName] = action.payload.data;
        }, 
    }
})

export const {
    addRegistrationData,
} = registerDataSlice.actions;

export const selectRegistrationData = state => state.registerData

export default registerDataSlice.reducer;