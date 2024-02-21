import { autoLogIn, isUserAuthed, readRegistrationData } from "./Firebase";

var data = null;

function getConventionName(index){
    console.log(data.conventions[index].name);
    return new Promise((resolve) => {
        setTimeout(() => {
          resolve(//data == null ? getNewData()['conventions'][index] : 
             data.conventions[index].name)
        }, 1500)
      })
}

function getConventionData(index){
    console.log(data.conventions[index].name);
    return new Promise((resolve) => {
        setTimeout(() => {
          resolve(
             data.conventions[index])
        }, 1500)
      })
}

function readData(){
    return new Promise((resolve) => {
        setTimeout(() => {
          resolve(data ?? getNewData())
        }, 1500)
      })
}

async function getNewData(){
    console.log("Reading Data");
    isUserAuthed() ? null : await autoLogIn();
    data = await readRegistrationData()
    return data;
}

const userDataConverter = {
    toFirestore: (userData) => {
        return {
            firstName: userData.firstName,
            lastName: userData.lastName,
            email: userData.email,
            conventions: userData.Conventions
        }
    },
    fromFirestore: (snapshot, options) => {
        const data = snapshot.data(options);
        return {
            conventions: data.conventions,
            people: data.people
            };
    }
}

export {userDataConverter, readData, getConventionName, getConventionData};