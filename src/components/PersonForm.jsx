import * as React from 'react';
import Box from '@mui/system/Box';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import DeleteIcon from '@mui/icons-material/Delete';
import Grid from '@mui/material/Unstable_Grid2';
import { red } from '@mui/material/colors';
import { FormControl, FormHelperText, IconButton, InputAdornment, InputLabel, MenuItem, Select, TextField, Tooltip } from '@mui/material';
import Divider from '@mui/material/Divider';
import { useDispatch, useSelector } from 'react-redux';
import { removePerson, selectConventionData, selectFormError, selectPeople, updateGlobalPerson, updatePerson } from '../features/userData/userDataSlice';
import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined';
import {genders, jobs, accommodations} from '../utils/datalists';
import { ConventionError, PeopleError } from '../utils/error';
import store from '../app/store';


export default function PersonForm({uuid, conventionIndex, personIndex}) {
    const dispatch = useDispatch();
    const person = useSelector(selectPeople)[uuid];
    const personData = useSelector(selectConventionData)[conventionIndex].people[personIndex]; //I hate this but I can't think of a better way to access per convention user data
    const [isSelected, setIsSelected] = React.useState('');


    const conventionError = store.getState().errorState.conventions[conventionIndex] ?? new ConventionError();
    const error = conventionError.people[personIndex] ?? new PeopleError();

    function handleClick() {
        setIsSelected(!isSelected);
    }

    const handleGlobalChange = event => { 
        dispatch(updateGlobalPerson({uuid: uuid, field: event.target.name, change: event.target.value}))
    }

    const handleChange = event => {  
        console.log(event);  
        dispatch(updatePerson({conventionIndex: conventionIndex, personIndex: personIndex, field: event.target.name, change: event.target.value}))
    }

    const handleDelete = () => {
        dispatch(removePerson({conventionIndex: conventionIndex, personIndex: personIndex}))
    }

    return (
        <ThemeProvider
            theme={createTheme()}>
            <Box sx={{ border: 1, borderRadius: '5px', borderColor: colorFromErrorState(error.anyError), width: "max-width", height: "min-height"}}>
                <Grid container onClick={handleClick}>
                    <Grid>
                        <Typography color={error.anyError ? "red" : "black"} sx={{ margin: "10px 20px", fontSize: "35px"}}>
                            {person.firstName == "" && person.lastName == "" ? "Enter a name" : person.firstName + " " + person.lastName}
                        </Typography>
                    </Grid>
                    <Grid sx={{marginLeft: "auto", display: 'flex', alignItems: 'center'}}>
                        <IconButton onClick={() => handleDelete()}>
                            <DeleteIcon sx={{ color: red[500]}} />
                        </IconButton>
                    </Grid>
                    <Grid sx={{marginRight: "10px", display: 'flex', alignItems: 'center'}}>
                        
                        {isSelected ? 
                            (<Tooltip title="Hide"><ArrowDropUpIcon sx={{fontSize: '70px',}} /></Tooltip>) :
                            (<Tooltip title="Expand"><ArrowDropDownIcon sx={{fontSize: '70px',}} /></Tooltip>)}
                        
                    </Grid>
                </Grid>
                {isSelected ? 
                    (<>
                    <Divider sx={{margin: "0px 20px", borderBottomWidth: 3}}/>
                    <Box sx={{ mt: 3 }} width="95%" padding="0px 2.5%" marginBottom="10px">
                    <Grid container spacing={2}>
                        <Grid xs={12} md={6} >
                            <IconTextField 
                                tooltip="Enter FIRST Name here" 
                                autoComplete="given-name" 
                                fullWidth 
                                label="First Name"
                                name="firstName"
                                error={error.firstName != null}
                                helperText={error.firstName != null && error.firstName != "" ? error.firstName : null}
                                variant="outlined" 
                                id="firstName" 
                                value={person.firstName ?? ""} 
                                onChange={(e) => handleGlobalChange(e)} 
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
                                error={error.lastName != null}
                                helperText={error.lastName != null && error.lastName != "" ? error.lastName : null}
                                variant="outlined" 
                                value={person.lastName ?? ""} 
                                onChange={(e) => handleGlobalChange(e)}
                            />
                        </Grid>
                        <Grid xs={12} md={6}>
                            <IconTextField 
                                tooltip="Enter AGE here" 
                                fullWidth 
                                type="number"
                                id="age" 
                                name="age" 
                                error={error.age != null}
                                helperText={error.age != null && error.age != "" ? error.age : null}
                                label="Age" 
                                variant="outlined" 
                                value={person.age  ?? ""} 
                                onChange={(e) => handleGlobalChange(e)}
                            />
                        </Grid>
                        <Grid xs={12} md={6}>
                            <FormControl fullWidth>
                                <InputLabel error={error.gender != null} id="gender-selector-label">Gender</InputLabel>
                                <Select
                                    endAdornment={<HelpIcon helpText="Select your Gender" margin="0px 10px"/>}
                                    labelId="gender-selector-label"
                                    id="gender-selector"
                                    name="gender"
                                    error={error.gender != null}
                                    value={person.gender  ?? ""}
                                    label="Gender"
                                    onChange={(e) => handleGlobalChange(e)}
                                >
                                    {genders.map((gender) => (
                                    <MenuItem key={gender} value={gender}>{gender}</MenuItem>
                                    ))}

                                </Select>
                                <FormHelperText error>{error.gender != null && error.gender != "" ? error.gender : null}</FormHelperText>
                            </FormControl>
                        </Grid>
                        <Grid xs={12}>
                            <FormControl fullWidth>
                                <InputLabel error={error.preferredJob != null} id="job-selector-label">Preferred Job</InputLabel>
                                <Select
                                    endAdornment={<HelpIcon helpText="Select your preferred job" margin="0px 10px"/>}
                                    labelId="job-selector-label"
                                    id="job-selector"
                                    name="job"
                                    error={error.preferredJob != null}
                                    value={personData.job  ?? ""}
                                    label="Preferred Job"
                                    onChange={(e) => handleChange(e)}
                                >
                                    {jobs.map((job) => (
                                        <MenuItem key={job} value={job}>{job}</MenuItem>
                                    ))}

                                </Select>
                                <FormHelperText error>{error.preferredJob != null && error.preferredJob != "" ? error.preferredJob : null}</FormHelperText>
                            </FormControl>
                        </Grid>
                        <Grid xs={12}>
                            <FormControl fullWidth>
                                <InputLabel error={error.accommodation != null} id="accommodation-selector-label">Accommodation</InputLabel>
                                <Select
                                    endAdornment={<HelpIcon helpText="Select your Accommodation" margin="0px 10px"/>}
                                    labelId="accommodation-selector-label"
                                    id="accommodation-selector"
                                    name="accommodation"
                                    error={error.accommodation != null}
                                    value={personData.accommodation  ?? ""}
                                    label="Accommodation"
                                    onChange={(e) => handleChange(e)}
                                >
                                    {accommodations.map((accommodation) => (
                                        <MenuItem key={accommodation} value={accommodation}>{accommodation}</MenuItem>
                                    ))}

                                </Select>
                                <FormHelperText error>{error.accommodation != null && error.accommodation != "" ? error.accommodation : null}</FormHelperText>
                            </FormControl>
                        </Grid>
                    </Grid>
                    </Box>
                    </>) :
                    null}
                
            </Box>
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

function colorFromErrorState(error) {
    if (error) return "red";
    return "black";
}