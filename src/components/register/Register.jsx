import { useSelector } from "react-redux";
import ResponsiveAppBar from "../Appbar";
import { selectPermissions } from "../../features/userData/userDataSlice";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import Grid from "@mui/material/Grid";
import { conventionDays } from "../../utils/datalists";
import React from "react";
import { selectRegistrationData } from "../../features/registerData/registerDataSlice";
import RegisterIndividual from "./RegisterIndividual";

export default function Register() {
    const permissions = useSelector(selectPermissions);
    const registrationData = useSelector(selectRegistrationData);
    const [day, setDay] = React.useState("");

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
                        <FormControl fullWidth>
                            <InputLabel id="day-selector-label">Day</InputLabel>
                            <Select
                            labelId="day-selector-label"
                            value={day}
                            label="Day"
                            onChange={(e) => setDay(e.target.value)}>
                                {conventionDays.map((day) => (<MenuItem key={day} value={day}>{day}</MenuItem>))}
                            </Select>
                        </FormControl>
                    </Grid>
                    {permissions.allowedAccess.map((access) => (registrationData[access] == null ? 
                        <Grid key={access} item xs={12}><button style={{display: "block", margin: "auto"}}>Load {access} data</button></Grid> : 
                        registrationData[access].map((person) => (<Grid key={person.name} item xs={12}><RegisterIndividual person={person} /></Grid>))
                        // <p>why</p>
                    ))}
                </Grid>
                
            }  
        </>
    )
}