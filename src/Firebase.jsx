import { initializeApp  } from "firebase/app";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword  } from "firebase/auth";
import { doc, setDoc, getDoc, getFirestore } from "firebase/firestore"; 
import { userDataConverter } from './UserData'

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
const db = getFirestore(app);
const auth = getAuth();

var user = null;

function logInUser(email, password){
    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
        // Signed in 
        user = userCredential.user;
        console.log(user);
        // ...
    })
    .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
    });
}

function createUser(email, password) {
    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
        // Signed up 
        user = userCredential.user;
        // ...
    })
    .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
    });
}

async function autoLogIn(){
    await signInWithEmailAndPassword(auth, "zacginever@outlook.com", "testing")
    .then((userCredential) => {
        // Signed in 
        user = userCredential.user;
        console.log(user);
        // ...
    })
    .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
    });
}

function writeUserData(firstName, lastName, email){
    setDoc(doc(db, 'users/' + user.uid), {
        firstName: firstName,
        lastName: lastName,
        email: email,
      });
}

async function readRegistrationData(){
    const docSnap = await getDoc(doc(db, 'users/', user.uid).withConverter(userDataConverter));

    if (docSnap.exists()){
        return docSnap.data();
    } else {
        console.log("Firestore document not found");
    }
}

export { writeUserData, readRegistrationData, autoLogIn};