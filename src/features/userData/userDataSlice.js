import { initializeApp  } from "firebase/app";
import { doc, setDoc, getDoc, getFirestore, initializeFirestore, persistentLocalCache } from "firebase/firestore"; 
import { v4 as uuidv4 } from 'uuid';
import { userDataConverter } from "../../utils/data";
import { createSlice } from "@reduxjs/toolkit";
import { FormError } from "../../utils/error";
import errorStateSlice, { selectFirstNameError, updateErrorState } from "../errorState/errorStateSlice";



// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCRGO1PR6dGLQeac-jTOtrvJ6pu0pxJ35Y",
    authDomain: "conventionapp-b0c29.firebaseapp.com",
    databaseURL: "https://conventionapp-b0c29-default-rtdb.nam5.firebaseio.com/",
    projectId: "conventionapp-b0c29",
    storageBucket: "conventionapp-b0c29.appspot.com",
    messagingSenderId: "98324564320",
    appId: "1:98324564320:web:5d666e37ed9c3fd6393605",
  };
  
// Initialize Firebase
//This is being done in two places and is bad coding but I can't be asked to fix it now (Firebase.jsx)
const app = initializeApp(firebaseConfig);
initializeFirestore(app, {localCache: persistentLocalCache(/*settings*/{})});
const db = getFirestore(app);


const initialState = {
    conventions: [],
    people: {},
    elderName: "",
    firstName: "",
    lastName: "",
    age: "",
    gender: "",
    timeRange: getInitialTimeRange(),
}

function getInitialTimeRange() {
    const date = new Date();
    if (date.getMonth() <= 3) {
        return new Date(date.getFullYear() - 1, 3).getTime() + '-' + new Date(date.getFullYear(), 2, 31).getTime();
    } else {
        return new Date(date.getFullYear(), 3).getTime() + '-' + new Date(date.getFullYear() + 1, 2, 31).getTime();
   }
}

//This is bad but I don't need uid for stateful reasons - yet
var uid = "";
export const setUid = (e) => {uid = e};
export const isUserAuthed = () => uid != "";

export const updateDataAsync = () => {
    return async (dispatch, getState) => {
        try {
            const docSnap = await getDoc(doc(db, 'users/', uid).withConverter(userDataConverter));

            console.log(docSnap.data());

            if (docSnap.exists()){
                dispatch(dataLoaded(docSnap.data()));
            } else {
                console.log("Firestore document not found");
            }
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
            console.log(action.payload);
            state.conventions = action.payload.conventions ?? [];
            state.people = action.payload.people ?? [];
            state.elderName = action.payload.elderName ?? "";
            state.firstName = action.payload.firstName ?? "";
            state.lastName = action.payload.lastName ?? "";
            state.age = action.payload.age ?? "";
            state.gender = action.payload.gender ?? "";
            console.log(state);
        },
        updateFirstName: (state, action) => {
            state.firstName = action.payload;
        },
        updateLastName: (state, action) => {
            state.lastName = action.payload;
        },
        updateAge: (state, action) => {
            state.age = action.payload;
        },
        updateGender: (state, action) => {
            state.gender = action.payload;
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
        setTimeRange: (state, action) => {
            state.timeRange = action.payload;
        },
        writeData: state => {
            setDoc(doc(db, 'users/' + uid), {
                conventions: state.conventions,
                people: state.people,
                elderName: state.elderName,
                firstName: state.firstName,
                lastName: state.lastName,
                age: state.age,
                gender: state.gender,
              });
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
                people: [],
                //Creates the event inside the date range if current time not in date range
                dateCreated: Number(state.timeRange.split('-')[0]) < Date.now() && Date.now() < Number(state.timeRange.split('-')[1]) ? Date.now() : Number(state.timeRange.split('-')[1]) - 1000
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
    updateFirstName,
    updateLastName,
    updateAge,
    updateGender,
    handleDateSelectorToggles, 
    updateGlobalPerson, 
    updatePerson, 
    setTimeRange,
    setElderName,
    addNewPerson,
    writeData,
    createNewPerson,
    addNewConvention,
    removePerson,
    removeConvention,
    deletePerson
} = userDataSlice.actions;

export const selectConventionData = state => state.userData.conventions;
export const selectPeople = state => state.userData.people;
export const selectElder = state => state.userData.elderName;
export const selectTimeRange = state => state.userData.timeRange;
export const selectFirstName = state => state.userData.firstName;
export const selectLastName = state => state.userData.lastName;
export const selectAge = state => state.userData.age;
export const selectGender = state => state.userData.gender;
export const selectFormError = state => state.userData.error;

export default userDataSlice.reducer;