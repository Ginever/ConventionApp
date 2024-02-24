import * as React from 'react';
import './App.css';
import ResponsiveAppBar from './components/Appbar'
import ConventionWidget from './components/ConventionWidget'
import FullWidthAdd from './components/FullWidthAdd';
import Grid from "@mui/material/Grid";
import { useDispatch, useSelector } from 'react-redux';
import { updateDataAsync, selectConventionData, selectPeople, addNewConvention, selectElder, setElderName, writeData } from './features/userData/userDataSlice'
import { Box, Button, ButtonGroup, IconButton, InputAdornment, Modal, TextField, Tooltip, Typography } from '@mui/material';
import { v4 as uuidv4 } from 'uuid';
import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined';



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

const conventions = [
  '1st Pukekohe', 
  '2nd Pukekohe', 
  '1st Masterton', 
  '2nd Masterton'
];


function App() {
  const conventionData = useSelector(selectConventionData);
  const people = useSelector(selectPeople);
  const elderName = useSelector(selectElder);
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
      <h1>Convention form</h1>
      <Grid container spacing={2} padding="0px 2.5%">
        <Grid item xs={12}>
        <IconTextField 
            tooltip="Enter you Elders Full name. This allows us to contact you though your elder should we need to" 
            fullWidth 
            label="Elders Name"
            name="eldersName"
            variant="outlined" 
            id="eldersName" 
            value={elderName} 
            onChange={(e) => dispatch(setElderName(e.target.value))} 
        />
        </Grid>
        <h2 style={{margin: "20px 1% 0px"}}>Convention's Attending: </h2>
        {conventionData.map((convention) => (
          <Grid key={convention.name} item xs={12}>
            <ConventionWidget index={conventionData.indexOf(convention)}/>
          </Grid>
              ))}
        <Grid item xs={12}>
          <FullWidthAdd disabled={conventionData.length == conventions.length} onClick={() => handleOpen()} tooltip="Add new convention" />
        </Grid>
        <Grid item xs={12}>
          <Button onClick={() => dispatch(writeData())}>Save</Button>
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
            (conventionData.find(o => o.name === convention) != null) ? null : 
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

export default App