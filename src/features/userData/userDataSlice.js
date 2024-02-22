import { createSlice } from "@reduxjs/toolkit";
import { autoLogIn, readRegistrationData, writeUserData } from "../../utils/Firebase";
import { v4 as uuidv4 } from 'uuid';

const initialState = {
    conventions: [],
    people: [],
    elderName: "",
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
            state.elderName = action.payload.elderName;
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
        setElderName: (state, action) => {
            state.elderName = action.payload;
        },
        createNewPerson: (state, action) => {
            const uuid = uuidv4();
            state.people[uuid] = {
                age: null,
                firstName: "",
                lastName: "",
                gender: ""
            }
            state.conventions[action.payload].people.push({
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
        },
        deletePerson: (state, action) => {

            //Remove the deleted person from all conventions
            var obj = [];
            state.conventions.forEach((element, index) => element.people.forEach((e, i) => { 
                if (e.uuid == action.payload) {
                    obj.push({
                        conventionIndex: index, 
                        personIndex: i
                    })
                }
            }))
            obj.forEach((element) => state.conventions[element.conventionIndex].people.splice(element.personIndex, 1));
            
            //delete person for people
            delete state.people[action.payload];
        },
    }
})

export const { 
    dataLoaded, 
    handleDateSelectorToggles, 
    updateGlobalPerson, 
    updatePerson, 
    setElderName,
    addNewPerson,
    createNewPerson,
    addNewConvention,
    removePerson,
    removeConvention,
    deletePerson
} = userDataSlice.actions;

export const selectConventionData = state => state.userData.conventions;
export const selectPeople = state => state.userData.people;
export const selectElder = state => state.userData.elderName

export default userDataSlice.reducer;