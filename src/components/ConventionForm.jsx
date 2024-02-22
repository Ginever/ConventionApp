import * as React from 'react';
import Grid from "@mui/material/Grid";
import Box from '@mui/material/Box'
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Typography from '@mui/material/Typography';
import useWindowDimensions  from "../utils/useWindowDimensions";
import Divider from '@mui/material/Divider';
import PersonForm from './PersonForm';
import FullWidthAdd from './FullWidthAdd';
import { useDispatch, useSelector } from 'react-redux';
import { addNewPerson, createNewPerson, deletePerson, handleDateSelectorToggles, selectConventionData, selectPeople } from '../features/userData/userDataSlice';
import { Button, ButtonGroup, IconButton, Modal } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';


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

const conventionDays = ["Thursday", "Friday", "Saturday", "Sunday", "Monday"]

export default function ConventionForm({index}) {
    const dispatch = useDispatch();
    const conventionData = useSelector(selectConventionData)[index];
    const people = useSelector(selectPeople);

    const [open, setOpen] = React.useState(false); //For the personSelect modal
    const handleOpen = () => {
    setOpen(true);
    }
    const handleClose = () => {
    setOpen(false);
    }

    const {height, width} = useWindowDimensions();
    

    const handleToggleButton = (event, newToggles) => {
        dispatch(handleDateSelectorToggles({index: index, daysAttending: newToggles}))
    }

    return (
        <Box component="form" noValidate onSubmit={null} sx={{ mt: 3 }} width="90%" padding="0px 5%" marginBottom="10px">
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <Box sx={{width: 'max-width', height: 'min-height', display: "flex", alignItems: "center"}}>
                    <Typography sx={{width: "min-width", float: "left", height: 'max-height', textAlign: "left", marginRight: "auto"}}>Select the days you be attending Convention:</Typography>
                    <ToggleButtonGroup 
                        color="primary"
                        orientation={width<800 ? "vertical": "horizontal"} 
                        value={conventionData.daysAttending}
                        onChange={handleToggleButton}
                        variant="contained" 
                        aria-label="Convention Days" 
                        sx={{marginLeft: 'auto', float: 'right'}}
                    >
                        {conventionDays.map((conventionDay) => (
                            <ToggleButton value={conventionDay} key={conventionDay} aria-label={conventionDay}>{conventionDay}</ToggleButton>
                        ))}
                    </ToggleButtonGroup>
                </Box>
            </Grid>
            <Grid item xs={12}>
                <Divider sx={{ borderBottomWidth: 3, width: "max-width"}}/>
            </Grid>
            <Grid item xs={12}>
                <Typography sx={{width: "min-width", float: "left", height: 'max-height', textAlign: "left", marginRight: "auto", fontSize: "20px"}}>Who is attending this Convention:</Typography>
            </Grid>
            
            {conventionData.people.map((person) => (
                <Grid item key={person.uuid} xs={12}>
                    <PersonForm uuid={person.uuid} conventionIndex={index} personIndex={conventionData.people.indexOf(person)}/>
                </Grid>
            ))}
            <Grid item xs={12}>
                <FullWidthAdd tooltip="Add new person" onClick={() => handleOpen()}/>
            </Grid>
        </Grid>

        <Modal
        open={open}
        onClose={handleClose}
        >
            <Box sx={style}>
            <h1>Who else is attending {conventionData.name}?</h1>
            <ButtonGroup
            fullWidth
            orientation="vertical"
            aria-label="Vertical button group"
            variant="text"
            >
            {Object.keys(people).map((person) => (
                (conventionData.people.find(o => o.uuid === person) != null) ? null : 
                <Button 
                    onClick={() => {
                        dispatch(addNewPerson({conventionIndex: index, uuid: person})); 
                        handleClose();}}
                        key={people} 
                        name={people} 
                        xs={12} 
                        width={1}
                    endIcon={<DeleteIcon onClick={() => {console.log("Clicked"); dispatch(deletePerson(uuid));}}/>} 
                >
                {people[person].firstName} {people[person].lastName}
                </Button>
            ))}
            <Button onClick={() => {dispatch(createNewPerson(index)); handleClose()}}>
                Add New
            </Button>
            </ButtonGroup>
            </Box>
        </Modal>

        </Box>
    )
}

const DeleteIconButton = ({uuid}) => {
    return (<DeleteIcon onClick={() => {console.log("Clicked"); dispatch(deletePerson(uuid));}}/>);
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