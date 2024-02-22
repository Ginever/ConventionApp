import { createSlice } from "@reduxjs/toolkit";
import { autoLogIn, readRegistrationData, writeUserData } from "../../utils/Firebase";
import { v4 as uuidv4 } from 'uuid';

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
            state.conventions[action.payload.index].daysAttending = action.payload.daysAttending;
        },
        updateGlobalPerson: (state, action) => {
            state.people[action.payload.uuid][action.payload.field] = action.payload.change;
        },
        updatePerson: (state, action) => {
            state.conventions[action.payload.conventionIndex].people[action.payload.personIndex][action.payload.field] = action.payload.change;
        },
        createNewPerson: (state, action) => {
            const uuid = uuidv4();
            state.people[uuid] = {
                age: null,
                firstName: "",
                lastName: "",
                gender: ""
            }
            state.conventions[action.payload.conventionIndex].people.push({
                accommodation: "",
                job: "",
                uuid: uuid
            })
        },
        addNewPerson: (state, action) => {
            state.conventions[action.payload.conventionIndex].people.push({
                accommodation: "",
                job: "",
                uuid: action.payload.uuid
            })
        },
        addNewConvention: (state, action) => {
            state.conventions.push({
                name: action.payload,
                daysAttending: [],
                people: []
            })
        },
        removePerson: (state, action) => {
            state.conventions[action.payload.conventionIndex].people.splice(action.payload.personIndex, 1);
        },
        removeConvention: (state, action) => {
            state.conventions.splice(action.payload,1);
        }
    }
})

export const { 
    dataLoaded, 
    handleDateSelectorToggles, 
    updateGlobalPerson, 
    updatePerson, 
    addNewPerson,
    createNewPerson,
    addNewConvention,
    removePerson,
    removeConvention
} = userDataSlice.actions;

export const selectConventionData = state => state.userData.conventions;
export const selectPeople = state => state.userData.people;

export default userDataSlice.reducer;