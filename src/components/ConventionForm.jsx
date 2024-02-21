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
import { getConventionData } from '../utils/data';
import { TempleBuddhist } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { handleDateSelectorToggles, selectConventionData } from '../features/userData/userDataSlice';


const conventionDays = ["Thursday", "Friday", "Saturday", "Sunday", "Monday"]

export default function ConventionForm({index}) {
    const dispatch = useDispatch();
    const conventionData = useSelector(selectConventionData)[index];

    const {height, width} = useWindowDimensions();
    

    const handleToggleButton = (event, newToggles) => {
        dispatch(handleDateSelectorToggles({index: index, daysAttending: newToggles}))
    }

    return (
        <Box component="form" noValidate onSubmit={null} sx={{ mt: 3 }} width="90%" padding="0px 5%" marginBottom="10px">
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <Box sx={{width: 'max-width', height: 'min-height', display: "flex", alignItems: "center"}}>
                    <Typography sx={{width: "min-width", float: "left", height: 'max-height', textAlign: "left", marginRight: "auto"}}>What Days will you be attending Convention:</Typography>
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
                <Typography sx={{width: "min-width", float: "left", height: 'max-height', textAlign: "left", marginRight: "auto", fontSize: "20px"}}>Who is attending Convention:</Typography>
            </Grid>
            
            {conventionData.people.map((person) => (
                <Grid item key={person} xs={12}>
                    <PersonForm uuid={person}/>
                </Grid>
            ))}
            <Grid item xs={12}>
                <FullWidthAdd />
            </Grid>
        </Grid>
        </Box>
    )
}