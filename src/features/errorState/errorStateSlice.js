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
            state.conventions = action.payload.conventions;
        },
        clearErrorState: (state, action) => {
            if (action.payload.firstName != null) state.firstName = null;
            if (action.payload.lastName != null) state.lastName = null;
            if (action.payload.age != null) state.age = null;
            if (action.payload.gender != null) state.gender = null;
            if (action.payload.elderName != null) state.elderName = null;
        },
        clearConventionErrorState: (state, action) => {
            state.conventions[action.payload.index].anyError = false;
            if (state.conventions[action.payload.index].daysAttending != null) state.conventions[action.payload.index].daysAttending = null;
        },
        clearPersonErrorState: (state, action) => {
            console.log('hi');
            if (state.conventions[action.payload.conventionIndex] != null){
                state.conventions[action.payload.conventionIndex].anyError = false;
                state.conventions[action.payload.conventionIndex].people[action.payload.personIndex].anyError = false;
                if (action.payload.firstName != null) state.conventions[action.payload.conventionIndex].people[action.payload.personIndex].firstName = null;
                if (action.payload.lastName != null) state.conventions[action.payload.conventionIndex].people[action.payload.personIndex].lastName = null;
                if (action.payload.age != null) state.conventions[action.payload.conventionIndex].people[action.payload.personIndex].age = null;
                if (action.payload.gender != null) state.conventions[action.payload.conventionIndex].people[action.payload.personIndex].gender = null;
                if (action.payload.job != null) state.conventions[action.payload.conventionIndex].people[action.payload.personIndex].preferredJob = null;
                if (action.payload.accommodation != null) state.conventions[action.payload.conventionIndex].people[action.payload.personIndex].accommodation = null;
            }
            console.log("bye");
        }
    }

})

export const {
    updateErrorState,
    clearErrorState,
    clearConventionErrorState,
    clearPersonErrorState,
} = errorStateSlice.actions;

export const selectFirstNameError = state => state.errorState.firstName;
export const selectLastNameError = state => state.errorState.lastName;
export const selectAgeError = state => state.errorState.age;
export const selectGenderError = state => state.errorState.gender;
export const selectElderNameError = state => state.errorState.elderName;
export const selectConventionError = state => state.errorState.conventions;

export default errorStateSlice.reducer;