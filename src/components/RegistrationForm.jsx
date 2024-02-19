import React from 'react';
import './style.css'
import TextField from '@mui/material/TextField';
import Grid from '@mui/system/Unstable_Grid'; //? Using unstable grid instead of Grid this might be an issue
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined';
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';


const conventions = [
  '1st Pukekohe', 
  '2nd Pukekohe', 
  '1st Masterton', 
  '2nd Masterton'
];

const accommodations = [
  'Off Grounds/Day Bed',
  'Off Grounds',
  'Family Tent (Own tent)',
  'Tent (Convention tent)',
  'Tent (Own tent)',
  'Shed',
  'Caravan',
  'Other'
];

var isAccommodationOther = false;

export default class RegistrationForm extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      firstName: "",
      lastName: "",
      age: "",
      convention: "",
      accommodation: "",
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    if ((event.target.name == "accommodation" && !isAccommodationOther) || accommodations.includes(event.target.value)){
      isAccommodationOther = event.target.value == 'Other'
    }

    this.setState({[event.target.name]: event.target.value});
  }

  handleSubmit() {
    writeUserData(this.state.firstName, this.state.lastName, this.state.email);
  }


  render() {
    return(
        <Box component="form" noValidate onSubmit={null} sx={{ mt: 3 }} width="80%" padding="0px 10%">
        <Grid container spacing={2}>
        <Grid xs={12} sm={6}>
            <IconTextField
            iconEnd={<HelpIcon helpText='Enter you FIRST name (please do not abbreviate or enter a nickname)' />}
            autoComplete="given-name"
            name="firstName"
            required
            fullWidth
            id="firstName"
            label="First Name"
            autoFocus
            value={this.state.firstName}
            onChange={this.handleChange}
            />
        </Grid>
        <Grid xs={12} sm={6}>
            <IconTextField
            iconEnd={<HelpIcon helpText='Enter you LAST name (please do not abbreviate or enter a nickname)' />}
            required
            fullWidth
            id="lastName"
            label="Last Name"
            name="lastName"
            autoComplete="family-name"
            value={this.state.lastName}
            onChange={this.handleChange}/>
        </Grid>
        <Grid xs={12}>
        <FormControl fullWidth>
          <InputLabel id="convention-selector-label">Convention Attending</InputLabel>
          <Select
            labelId="convention-selector-label"
            id="convention-selector"
            name="convention"
            value={this.state.convention}
            label="Convention Attending"
            onChange={this.handleChange}
          >
            {conventions.map((convention) => (
              <MenuItem key={convention} value={convention}>{convention}</MenuItem>
            ))}

          </Select>
        </FormControl>
        </Grid>

        <Grid xs={12}>
        <FormControl fullWidth>
          <InputLabel id="accommodation-selector-label">Accommodation Requirements</InputLabel>
          <Select
            endAdornment={<HelpIcon helpText="" margin="0px 10px" />}
            labelId="accommodation-selector-label"
            id="accommodation-selector"
            name="accommodation"
            value={accommodations.includes(this.state.accommodation) || !isAccommodationOther ? this.state.accommodation : "Other"}
            label="Accommodation Requirements"
            onChange={this.handleChange}
          >
            {accommodations.map((accommodation) => (
              <MenuItem key={accommodation} value={accommodation}>{accommodation}</MenuItem>
            ))}

          </Select>
        </FormControl>
        </Grid>

        {isAccommodationOther && (
          <Grid xs={11} xsOffset={1}>
            <IconTextField
            iconEnd={<HelpIcon helpText="Enter your other accommodation method" />}
            required
            fullWidth
            id="other-accommodation"
            label="Other Accommodation"
            name="accommodation"
            value={this.state.accommodation == "Other" ? "" : this.state.accommodation}
            onChange={this.handleChange}
            />
          </Grid>
        )}

        </Grid>
        </Box>
  );}
}

const IconTextField = ({ iconEnd, InputProps, ...props }) => {
  return (
    <TextField
      {...props}
      InputProps={{
        ...InputProps,
        endAdornment: iconEnd ? (
          <InputAdornment position="end">{iconEnd}</InputAdornment>
        ) : null
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