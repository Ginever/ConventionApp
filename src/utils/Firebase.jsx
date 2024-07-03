import { initializeApp  } from "firebase/app";
import { doc, setDoc, getDoc, getFirestore, initializeFirestore, persistentLocalCache } from "firebase/firestore"; 
import { userDataConverter } from './data'

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
//This is being done in two places and is bad coding but I can't be asked to fix it now (userDataSlice.js)
const app = initializeApp(firebaseConfig);
initializeFirestore(app, {localCache: persistentLocalCache(/*settings*/{})});
const db = getFirestore(app);

var user = null;

function writeUserData(conventions, people){
    console.log(conventions);
    console.log(people);
    setDoc(doc(db, 'users/' + user.uid), {
        conventions: conventions,
        people: people,
      });
}

async function readRegistrationData(uid){
    const docSnap = await getDoc(doc(db, 'users/', uid).withConverter(userDataConverter));

    if (docSnap.exists()){
        return docSnap.data();
    } else {
        console.log("Firestore document not found");
    }
}

export { writeUserData, readRegistrationData };