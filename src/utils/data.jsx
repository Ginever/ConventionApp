const userDataConverter = {
    toFirestore: (userData) => {
        return {
            conventions: userData.Conventions,
            people: userData.people,
            elderName: userData.elderName,
            firstName: userData.firstName,
            lastName: userData.lastName,
            age: userData.age,
            gender: userData.gender,
            permissions: userData.permissions
        }
    },
    fromFirestore: (snapshot, options) => {
        const data = snapshot.data(options);
        return {
            conventions: data.conventions,
            people: data.people,
            elderName: data.elderName,
            firstName: data.firstName,
            lastName: data.lastName,
            age: data.age,
            gender: data.gender,
            permissions: data.permissions
            };
    }
}

export {userDataConverter};