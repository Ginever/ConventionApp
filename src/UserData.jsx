class UserData {
    constructor (firstName, lastName, email){
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
    }
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
            firstName: data.firstName,
            lastName: data.lastName, 
            email: data.email,
            conventions: data.Conventions
            };
    }
}

export {userDataConverter};