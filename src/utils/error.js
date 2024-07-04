export class FormError {
    firstName;
    lastName;
    age;
    gender;
    elderName;
    conventions;

    constructor() {
        this.firstName = null;
        this.lastName = null;
        this.age = null;
        this.gender = null;
        this.elderName = null;
        this.conventions = [];
    }


    /**
     * Returns the convention error state for a given index
     * @returns ConventionError object
     */
    getConventionError(index) {
        // If the index is out of bounds, add new ConventionError objects until the index is in bounds
        while (index >= this.conventions.length) {
            this.conventions.push(new ConventionError());
        }
        return this.conventions[index];
    }

    doAnyError() {
        let anyError = false;   

        //We need to iterate though all convention errors to check if any have errors to display to the user
        for (let i = 0; i < this.conventions.length; i++) if (this.conventions[i].doAnyError()) anyError = true;

        if (anyError) return true;
        if (this.firstName != null) return true;
        if (this.lastName != null) return true;
        if (this.age != null) return true;
        if (this.gender != null) return true;
        if (this.elderName != null) return true;
        
        return false;
    }

    JSONfy() {
        const conventions = [];
        this.conventions.forEach(e => {
            conventions.push(e.JSONfy());
        });
        return {
            firstName: this.firstName,
            lastName: this.lastName,
            age: this.age,
            gender: this.gender,
            elderName: this.elderName,
            conventions: conventions,
        }
    }
}



export class ConventionError {
    anyError;
    daysAttending;
    people;

    constructor() {
        this.daysAttending = null;
        this.people = [];
        this.anyError = false;
    }

    /**
     * Returns the person error state for a given index
     * @returns PeopleError object
     */
    getPersonError(index) {
        // If the index is out of bounds, add new PeopleError objects until the index is in bounds
        while (index >= this.people.length) {
            this.people.push(new PeopleError());
        }
        return this.people[index];
    }


    /**
     * Checks ig any fields in this convention have errors
     * @returns true if any fields have input errors, false otherwise
     */
    doAnyError() {
        this.anyError = true;

        let error = false;
        for (let i = 0; i < this.people.length; i++) if (this.people[i].doAnyError()) error = true;

        if (error) return true;


        if (this.daysAttending != null) return true;
        

        this.anyError = false;
        return false;
    }

    JSONfy() {
        const people = [];
        this.people.forEach(e => {
            people.push(e.JSONfy());
        });
        return {
            anyError: this.anyError,
            daysAttending: this.daysAttending,
            people: people,
        }
    }
}

export class PeopleError {
    firstName;
    lastName;
    age;
    gender;
    preferredJob;
    accommodation;
    anyError;

    constructor() {
        this.firstName = null;
        this.lastName = null;
        this.age = null;
        this.gender = null;
        this.preferredJob = null;
        this.accommodation = null;
        this.anyError = false;
    }

    /**
     * Checks if any fields in this person have errors
     * @returns true if any fields have input errors, false otherwise
     */
    doAnyError() {
        this.anyError = true;

        if (this.firstName != null) return true;
        if (this.lastName != null) return true;
        if (this.age != null) return true;
        if (this.gender != null) return true;
        if (this.preferredJob != null) return true;
        if (this.accommodation != null) return true;

        this.anyError = false;
        return false;
    }

    JSONfy() {
        return {
            anyError: this.anyError,
            firstName: this.firstName,
            lastName: this.lastName,
            age: this.age,
            gender: this.gender,
            preferredJob: this.preferredJob,
            accommodation: this.accommodation,
        }
    }
}