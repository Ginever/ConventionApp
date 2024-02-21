import * as React from 'react';
import Box from '@mui/system/Box';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import DeleteIcon from '@mui/icons-material/Delete';
import Grid from '@mui/material/Unstable_Grid2';
import { red } from '@mui/material/colors';
import { Tooltip } from '@mui/material';
import Divider from '@mui/material/Divider';
import { useSelector } from 'react-redux';
import { selectPeople } from '../features/userData/userDataSlice';



export default function PersonForm({uuid}) {
    const person = useSelector(selectPeople)[uuid];
    const [isSelected, setIsSelected] = React.useState('');

    function handleClick() {
        setIsSelected(!isSelected);
    }

    return (
        <ThemeProvider
            theme={createTheme()}>
            <Box sx={{ border: 1, borderRadius: '5px', width: "max-width", height: "min-height"}}>
                <Grid container onClick={handleClick}>
                    <Grid>
                        <Typography sx={{ margin: "10px", fontSize: "40px"}}>
                            {person.firstName} {person.lastName}
                        </Typography>
                    </Grid>
                    <Grid sx={{marginLeft: "auto", display: 'flex', alignItems: 'center'}}>
                        <DeleteIcon sx={{ color: red[500]}} />

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
                    </>) :
                    null}
            </Box>
        </ThemeProvider>
    )
}