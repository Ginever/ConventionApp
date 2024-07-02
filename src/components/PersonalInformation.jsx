import * as React from 'react';
import { TextField, InputAdornment, Tooltip, IconButton, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Grid from '@mui/material/Unstable_Grid2';
import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined';
import { useDispatch, useSelector } from 'react-redux';
import { selectAge, selectFirstName, selectGender, selectLastName, updateAge, updateFirstName, updateGender, updateLastName } from '../features/userData/userDataSlice';
import { Box } from '@mui/system';



const genders = ['Male', 'Female', 'Other'].sort();

export default function PersonalInformation(){
    const dispatch = useDispatch();
    const firstName = useSelector(selectFirstName);
    const lastName = useSelector(selectLastName);
    const age = useSelector(selectAge);
    const gender = useSelector(selectGender);




    return (
        <ThemeProvider
            theme={createTheme()}>
            <h2>Personal Information: </h2>
                <Grid container spacing={2}>
                    <Grid xs={12} md={6}>
                        <IconTextField 
                            tooltip="Enter FIRST Name here" 
                            autoComplete="given-name" 
                            fullWidth 
                            label="First Name"
                            name="firstName"
                            variant="outlined" 
                            id="firstName" 
                            value={firstName ?? ""} 
                            onChange={(e) => dispatch(updateFirstName(e.target.value))} 
                        />
                    </Grid>
                    <Grid xs={12} md={6}>
                        <IconTextField 
                            tooltip="Enter LAST name here" 
                            autoComplete="family-name" 
                            fullWidth 
                            id="lastName" 
                            name="lastName" 
                            label="Last Name" 
                            variant="outlined" 
                            value={lastName ?? ""} 
                            onChange={(e) => dispatch(updateLastName(e.target.value))}
                        />
                    </Grid>
                    <Grid xs={12} md={6}>
                        <IconTextField 
                            tooltip="Enter AGE here" 
                            fullWidth 
                            type="number"
                            id="age" 
                            name="age" 
                            label="Age" 
                            variant="outlined" 
                            value={age  ?? ""} 
                            onChange={(e) => dispatch(updateAge(e.target.value))}
                        />
                    </Grid>
                    <Grid xs={12} md={6}>
                        <FormControl fullWidth>
                            <InputLabel id="gender-selector-label">Gender</InputLabel>
                            <Select
                                endAdornment={<HelpIcon helpText="Select your Gender" margin="0px 10px"/>}
                                labelId="gender-selector-label"
                                id="gender-selector"
                                name="gender"
                                value={gender  ?? ""}
                                label="Gender"
                                onChange={(e) => dispatch(updateGender(e.target.value))}
                            >
                                {genders.map((gender) => (
                                <MenuItem key={gender} value={gender}>{gender}</MenuItem>
                                ))}

                            </Select>
                        </FormControl>
                    </Grid>
                </Grid>
        </ThemeProvider>
    )
}


const IconTextField = ({ tooltip, InputProps, ...props }) => {
    return (
      <TextField
        {...props}
        InputProps={{
          ...InputProps,
          endAdornment: (
            <InputAdornment position="end"><HelpIcon helpText={tooltip} margin={props.margin} /></InputAdornment>
          ) 
        }}
      />
    );
};

const HelpIcon = ({helpText, margin}) => {
return (
    <Tooltip title={helpText} enterTouchDelay={0}> 
    <IconButton style={{margin: margin}}> 
        <HelpOutlineOutlinedIcon />
    </IconButton> 
    </Tooltip>
);
}