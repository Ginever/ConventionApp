import { useDispatch } from "react-redux";
import store from "../app/store";
import { updateErrorState } from "../features/errorState/errorStateSlice";
import { FormError } from "./error";



export function checkWholeForm(dispatch) {
    const state = store.getState().userData;
    // const dispatch = useDispatch();
    let errors = new FormError();
    if (state.firstName == "") errors.firstName = "First Name required";
    if (state.lastName == "") errors.lastName = "Last Name required";
    if (state.age == "") errors.age = "Age required";
    if (state.gender == "") errors.gender = "Gender Required"
    if (state.elderName == "") errors.elderName = "Elder's name required"

    dispatch(updateErrorState(errors.JSONfy()));
}