import { useDispatch, useSelector } from "react-redux";
import ResponsiveAppBar from "../Appbar";
import { selectPermissions } from "../../features/userData/userDataSlice";
import { Divider, FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import Grid from "@mui/material/Grid";
import { conventionDays } from "../../utils/datalists";
import React from "react";
import { selectRegistrationData } from "../../features/registerData/registerDataSlice";
import RegisterIndividual from "./RegisterIndividual";
import { readRegistrationData } from "../../utils/Firebase";
import store from "../../app/store";

export default function Register() {
    const permissions = useSelector(selectPermissions);
    const registrationData = useSelector(selectRegistrationData);
    const [day, setDay] = React.useState(conventionDays[0]);
    const [search, setSearch] = React.useState("");
    const [convention, setConvention] = React.useState(permissions.allowedAccess[0]);    

    const dispatch = useDispatch();

    function handleChange(event, dispatch) {
        console.log(event.target);
        switch(event.target.name) {
            case "search":
                setSearch(event.target.value);
                break;
            case "daySelector":
                setDay(event.target.value);
                break;
            case "conventionSelector":
                setConvention(event.target.value);
                break;
            default:
                console.log("Error in handleChange");
        }
        console.log(convention);
        dispatch(readRegistrationData(convention, day));
    }

    console.log(registrationData);

    return (
        <>
            <ResponsiveAppBar />
            {permissions.level === 0 ? <h1>You do not have permission to see this page</h1> :
                <Grid container spacing={2} padding="0px 2.5%">
                    <Grid item xs={12}>
                        <h1>Register</h1>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField 
                            fullWidth
                            label="Search"
                            name="search"
                            value={search}
                            error
                            helperText="This feature is not yet implemented"
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <FormControl fullWidth>
                            <InputLabel id="day-selector-label">Day</InputLabel>
                            <Select
                            labelId="day-selector-label"
                            value={day}
                            label="Day"
                            name="daySelector"
                            onChange={(e) => handleChange(e, dispatch)}>
                                {conventionDays.map((day) => (<MenuItem key={day} value={day}>{day}</MenuItem>))}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                        <FormControl fullWidth>
                            <InputLabel id="convention-selector-label">Convention</InputLabel>
                            <Select
                            labelId="convention-selector-label"
                            value={convention}
                            label="Convention"
                            name="conventionSelector"
                            onChange={(e) => handleChange(e, dispatch)}>
                                {permissions.allowedAccess.map((convention) => (<MenuItem key={convention} value={convention}>{convention}</MenuItem>))}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                        <Divider sx={{ borderBottomWidth: 3, width: "max-width"}}/>
                    </Grid>
                    {permissions.allowedAccess.map((access) => (registrationData[access] == null ? 
                        <Grid key={access} item xs={12}><button onClick={() => readRegistrationData(access, day, dispatch)} style={{display: "block", margin: "auto"}}>Load {access} data</button></Grid> : 
                        registrationData[access].map((person) => (<Grid key={person.name} item xs={12}><RegisterIndividual person={person} /></Grid>))
                    ))}
                </Grid>
                
            }  
        </>
    )
}