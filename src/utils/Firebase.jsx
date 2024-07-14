import { initializeApp  } from "firebase/app";
import { doc, setDoc, getDoc, getFirestore, initializeFirestore, persistentLocalCache, query, collection, where, getDocs } from "firebase/firestore"; 
import { userDataConverter } from './data'
import { getAuth, signInAnonymously, signInWithEmailAndPassword } from "firebase/auth";
import { LastPage } from "@mui/icons-material";
import { addRegistrationData } from "../features/registerData/registerDataSlice";

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
const app = initializeApp(firebaseConfig);
initializeFirestore(app, {localCache: persistentLocalCache(/*settings*/{})});
const db = getFirestore(app);
const auth = getAuth(app);

export var user = null;

export const isUserAuthed = () => user != null ? user.isAnonymous : false;

export async function signInWithEmail(email, password){
    await signInWithEmailAndPassword(auth, email, password).then((value) => {user = value.user; console.log(user);});
}

export async function createUserWithEmail(email, password){
    await createUserWithEmailAndPassword(auth, email, password).then((value) => user = value.user);
}

//Sign in Anonymously
signInAnonymously(auth).then((value) => user = value.user, (err) => console.log(err));

function writeUserData(data){
    console.log(data);
    setDoc(doc(db, 'users/', user.uid), data);
}

async function readUserData(){
    try {
        const docSnap = await getDoc(doc(db, 'users/', user.uid).withConverter(userDataConverter));

        console.log(docSnap.data());

        if (docSnap.exists()){
            return docSnap.data();
        } else {
            console.log("Firestore document not found");
            return null;
        }

    } catch (e) {
        console.error("Error reading document: ", e);
        return null;
    }
}

export const readRegistrationData = (conventionName, day) => async dispatch => {
    const querySnapshot = await getDocs(query(collection(db, 'conventionData/','2024-2025/', conventionName), 
    where("daysAttending", "array-contains", day)));
    const conventionUserData = [];
    querySnapshot.forEach((doc) => conventionUserData.push(doc.data()));

    console.log(conventionUserData);

    dispatch(addRegistrationData({conventionName: conventionName, data: conventionUserData}));
}

export function writeConventionData(conventionName, data){
    data["isAnonymous"] = user.isAnonymous;

    setDoc(doc(db, 'conventionData/','2024-2025/', conventionName, user.uid), data).then((e) => console.log(e), (err) => console.log(err));
}

export { writeUserData, readUserData };