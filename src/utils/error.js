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

    JSONfy() {
        return {
            firstName: this.firstName,
            lastName: this.lastName,
            age: this.age,
            gender: this.gender,
            elderName: this.elderName,
            // conventions: this.conventions == [] ? this.conventions.forEach(e => {e.JSONfy}) : [],
        }
    }
}



export class ConventionError {
    daysSelected;
    people;

    constructor() {
        this.daysSelected = null;
        this.people = [];
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
        if (this.daysSelected != null) return true;
        for (let i = 0; i < this.people.length; i++) if (this.people[i].doAnyError()) return true;

        return false;
    }

    JSONfy() {
        return {
            daysSelected: this.daysSelected,
            people: this.people == [] ? this.people.forEach(e => e.JSONfy) : [],
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

    constructor() {
        this.firstName = null;
        this.lastName = null;
        this.age = null;
        this.gender = null;
        this.preferredJob = null;
        this.accommodation = null;
    }

    /**
     * Checks if any fields in this person have errors
     * @returns true if any fields have input errors, false otherwise
     */
    doAnyError() {
        if (this.firstName != null) return true;
        if (this.lastName != null) return true;
        if (this.age != null) return true;
        if (this.gender != null) return true;
        if (this.preferredJob != null) return true;
        if (this.accommodation != null) return true;

        return false;
    }

    JSONfy() {
        return {
            firstName: this.firstName,
            lastName: this.lastName,
            age: this.age,
            gender: this.gender,
            preferredJob: this.preferredJob,
            accommodation: this.accommodation,
        }
    }
}