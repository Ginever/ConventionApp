import * as React from 'react';
import './App.css';
import ResponsiveAppBar from './components/Appbar'
import { writeUserData } from './utils/Firebase';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import ConventionWidget from './components/ConventionWidget'
import FullWidthAdd from './components/FullWidthAdd';
import Grid from "@mui/material/Grid";
import { useDispatch, useSelector } from 'react-redux';
import { updateDataAsync, selectConventionData, selectPeople, addNewConvention } from './features/userData/userDataSlice'
import { Box, Button, ButtonGroup, Modal, Typography } from '@mui/material';
import { v4 as uuidv4 } from 'uuid';


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

  React.useEffect(() => {
    dispatch(updateDataAsync());
  }, []);

  return true ? (
    <div>
      <ResponsiveAppBar />
      <h1>Convention form</h1>
      <Grid container spacing={2} padding="0px 2.5%">
        {conventionData.map((convention) => (
          <Grid key={convention.name} item xs={12}>
            <ConventionWidget index={conventionData.indexOf(convention)}/>
          </Grid>
              ))}
        <Grid item xs={12}>
          <FullWidthAdd disabled={conventionData.length == conventions.length} onClick={() => handleOpen()} tooltip="Add new convention" />
        </Grid>
        <Grid item xs={12}>
          <Button onClick={() => writeUserData(conventionData, people)}>Save</Button>
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
    ) : (
      <SignUp />
    )
}

export default App
