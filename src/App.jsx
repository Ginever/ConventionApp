import * as React from 'react';
import './App.css';
import ResponsiveAppBar from './components/Appbar'
import ConventionWidget from './components/ConventionWidget'
import FullWidthAdd from './components/FullWidthAdd';
import Grid from "@mui/material/Grid";
import { useDispatch, useSelector } from 'react-redux';
import { selectConventionData, selectPeople, addNewConvention, selectElder, setElderName, writeData, selectTimeRange, selectFirstName } from './features/userData/userDataSlice'
import { Box, Button, ButtonGroup, Divider, IconButton, InputAdornment, Modal, TextField, Tooltip, Typography } from '@mui/material';
import { v4 as uuidv4 } from 'uuid';
import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined';
import PersonalInformation from './components/PersonalInformation';
import { conventions } from './utils/datalists';
import store from './app/store';
import { checkWholeForm, formatAndSendConventionData } from './utils/errorChecking';
import { clearErrorState, selectElderNameError } from './features/errorState/errorStateSlice';
import { writeConventionData } from './utils/Firebase';
import { Opacity } from '@mui/icons-material';


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '50%',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  borderRadius: '5px',
  boxShadow: 24,
  p: 4,
};



function App() {
  const conventionData = useSelector(selectConventionData);
  const people = useSelector(selectPeople);
  const elderName = useSelector(selectElder);
  const timeRange = useSelector(selectTimeRange);
  const elderNameError = useSelector(selectElderNameError);
  const dispatch = useDispatch();

  const [open, setOpen] = React.useState(false); //For the conventionSelect modal

  const handleOpen = () => {
    setOpen(true);
  }
  const handleClose = () => {
    setOpen(false);
  }

  const handleConventionButtonPress = event => {
    handleClose();
    dispatch(addNewConvention(event.target.name));
  }

  return (
    <div>
      <ResponsiveAppBar />
      <Box style={{margin: "1%", border: "3px solid green"}}>
        <Box opacity="60%" style={{backgroundColor: "lightgreen", height: "100%", padding: "10px"}}>
          <p style={{margin: 0, opacity: "100%", textAlign: "center"}}>This form is currently in development so expect bugs and occasional loss of entered data!!!!</p>
          <p style={{margin: 0, opacity: "100%", textAlign: "center"}}>The code is open source and can be found <a href="https://github.com/Ginever/ConventionApp" target="_blank">here</a> if you feel the urge to fix my code or UX/UI yourself.</p>
          <p style={{margin: 0, opacity: "100%", textAlign: "center"}}>If you come across any peculiar behavior, bugs or just have a suggestion please raise a github issue <a href='https://github.com/Ginever/ConventionApp/issues'>here</a> and someone (or you☺) will see it and hopefully fix it.</p>
        </Box>
      </Box>
      <h1>Convention form</h1>
      <Grid container spacing={2} padding="0px 2.5%">
        <Grid item xs={12}>
        <PersonalInformation />
          </Grid>
        <Grid item xs={12}>
        <IconTextField 
            tooltip="Enter you Elders Full name. This allows us to contact you though your elder should we need to" 
            fullWidth 
            label="Elders Name"
            name="eldersName"
            variant="outlined" 
            id="eldersName"
            error={elderNameError != null}
            helperText={elderNameError != null && elderNameError != "" ? elderNameError : null}
            value={elderName} 
            onChange={(e) => dispatch(setElderName(e.target.value))} 
            onClick={() => dispatch(clearErrorState({elderName: ""}))}
        />
        </Grid>
        <Grid item xs={12}>
          <h2 style={{margin: 0}}>Convention's Attending: </h2>
        </Grid>
        {conventionData
        .filter((convention) => isConventionInTimeRange(convention, timeRange))
        .map((convention) => (
          <Grid key={convention.name} item xs={12}>
            <ConventionWidget index={conventionData.indexOf(convention)}/>
          </Grid>
              ))}
        <Grid item xs={12}>
          <FullWidthAdd disabled={conventions.length == conventionData.filter((convention) => isConventionInTimeRange(convention, timeRange)).length} onClick={() => handleOpen()} tooltip="Add new convention" />
        </Grid>
        <Grid item xs={12}>
            <Divider sx={{ borderBottomWidth: 3, width: "max-width"}}/>
        </Grid>
        <Grid item xs={12}>
          <Tooltip title="Save your progress">
            <span>
              <Button onClick={() => dispatch(writeData())} sx={{ border: 1, borderRadius: '5px', width: "100%", display: "flex", justifyContent: "center", alignItems: "center"}}>
                  Save
              </Button>
            </span>
          </Tooltip>
        </Grid>
        <Grid item xs={12}>
          <Tooltip title="Submit your information to convention managers">
            <span>
              <Button onClick={() => {if (checkWholeForm(dispatch)) formatAndSendConventionData()} } sx={{ border: 1, borderRadius: '5px', width: "100%", display: "flex", justifyContent: "center", alignItems: "center"}}>
                  Submit
              </Button>
            </span>
          </Tooltip>
        </Grid>
      </Grid>

      <Modal
        open={open}
        onClose={handleClose}
      >
        <Box sx={style}>
        <h1>Which Convention will you be attending</h1>
        <ButtonGroup
        fullWidth
        orientation="vertical"
        aria-label="Vertical button group"
        variant="text"
        >
          {conventions.map((convention) => (
            (conventionData.find(o => (o.name === convention && isConventionInTimeRange(o, timeRange))) != null) ? null : 
            <Button onClick={(e) => handleConventionButtonPress(e)} key={uuidv4()} name={convention} xs={12} width={1}>
              {convention}
            </Button>
          ))}
          
        </ButtonGroup>
        </Box>
      </Modal>
    </div>
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

function isConventionInTimeRange(convention, timeRange){
  return Number(timeRange.split('-')[0]) < convention.dateCreated && convention.dateCreated < Number(timeRange.split('-')[1]);
}

export default App