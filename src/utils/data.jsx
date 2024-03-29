import { readRegistrationData } from "./Firebase";

var data = null;

function getConventionName(index){
    console.log(data.conventions[index].name);
    return new Promise((resolve) => {
        setTimeout(() => {
          resolve(
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
            conventions: userData.Conventions,
            people: userData.people,
            elderName: userData.elderName
        }
    },
    fromFirestore: (snapshot, options) => {
        const data = snapshot.data(options);
        return {
            conventions: data.conventions,
            people: data.people,
            elderName: data.elderName
            };
    }
}

export {userDataConverter, readData, getConventionName, getConventionData};