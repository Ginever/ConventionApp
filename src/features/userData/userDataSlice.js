import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { autoLogIn, readRegistrationData } from "../../utils/Firebase";
import { amber } from "@mui/material/colors";


const initialState = {
    conventions: [],
    people: []
}

export const updateDataAsync = () => {
    return async (dispatch, getState) => {
        try {
            await autoLogIn();
            const response = await readRegistrationData();
            dispatch(dataLoaded(response));
            console.log(getState().userData);
        } catch (err){
            console.error(err);
        }
    }
}

export const userDataSlice = createSlice({
    name: 'userData',
    initialState,
    reducers : {
        dataLoaded: (state, action) => {
            state.conventions = action.payload.conventions;
            state.people = action.payload.people;
        },
        handleDateSelectorToggles: (state, action) => {
            console.log(action.payload);
            state.conventions[action.payload.index].daysAttending = action.payload.daysAttending;
        }
    }
})

export const { dataLoaded, handleDateSelectorToggles } = userDataSlice.actions;

export const selectConventionData = state => state.userData.conventions;
export const selectPeople = state => state.userData.people;

export default userDataSlice.reducer;