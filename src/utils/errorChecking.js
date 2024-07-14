import store from "../app/store";
import { updateErrorState } from "../features/errorState/errorStateSlice";
import { writeConventionData } from "./Firebase";
import { ConventionError, FormError, PeopleError } from "./error";



export function checkWholeForm(dispatch) {
    const state = store.getState().userData;
    const errors = new FormError();
    if (state.firstName == "") errors.firstName = "First Name required";
    if (state.lastName == "") errors.lastName = "Last Name required";
    if (state.age == "") errors.age = "Age required";
    if (state.gender == "") errors.gender = "Gender Required"
    if (state.elderName == "") errors.elderName = "Elder's name required"

    for (let i = 0; i < state.conventions.length; i++) {
        const convention = state.conventions[i];
        const conventionError = new ConventionError();
        if (convention.daysAttending.length == 0) conventionError.daysAttending = "At least one day must be selected";

        for (let j = 0; j < convention.people.length; j++) {
            //both people variables are needed as people data is stored in two places
            const person1 = convention.people[j];
            const person2 = state.people[person1.uuid];

            let personError = new PeopleError();

            if (person2.firstName == "" || person2.firstName == null) personError.firstName = "First Name required";
            if (person2.lastName == "" || person2.lastName == null) personError.lastName = "Last Name required";
            if (person2.age == "" || person2.age == null) personError.age = "Age required";
            if (person2.gender == "" || person2.gender == null) personError.gender = "Gender required";
            if (person1.job == "" || person1.job == null) personError.preferredJob = "Preferred Job required";
            if (person1.accommodation == "" || person1.accommodation == null) personError.accommodation = "Accommodation required";

            conventionError.people.push(personError);
        }

        errors.conventions.push(conventionError);
    }

    //needs to be called before JSONfy as it checks for error states further up the tree and set them in the objects
    const errorState = errors.doAnyError();

    dispatch(updateErrorState(errors.JSONfy()));

    return errorState
}

export function formatAndSendConventionData() {
    const state = store.getState().userData;

    for (let i = 0; i < state.conventions.length; i++) {
        const convention = state.conventions[i];
        writeConventionData(convention.name, {
            firstName: state.firstName,
            lastName: state.lastName,
            elderName: state.elderName,
            daysAttending: convention.daysAttending,
        });
    }
}