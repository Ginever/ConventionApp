import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    firstName: null,
    lastName: null,
    age: null,
    gender: null,
    elderName: null, 
    conventions: [],
}

export const errorStateSlice = createSlice({
    name: 'errorState',
    initialState,
    reducers : {
        updateErrorState: (state, action) => {
            state.firstName = action.payload.firstName;
            state.lastName = action.payload.lastName;
            state.age = action.payload.age;
            state.gender = action.payload.gender;
            state.elderName = action.payload.elderName;
        }
    }

})

export const {
    updateErrorState,
} = errorStateSlice.actions;

export const selectFirstNameError = state => state.errorState.firstName;
export const selectLastNameError = state => state.errorState.lastName;
export const selectAgeError = state => state.errorState.age;
export const selectGenderError = state => state.errorState.gender;
export const selectElderNameError = state => state.errorState.elderName;

export default errorStateSlice.reducer;