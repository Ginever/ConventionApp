import * as React from 'react';
import Box from '@mui/system/Box';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import { Button } from '@mui/material';



export default function FullWidthAdd({onClick}) {

    return (
        <ThemeProvider
            theme={createTheme()}>
            <Button onClick={onClick} sx={{ border: 1, borderRadius: '5px', width: "100%", display: "flex", justifyContent: "center", alignItems: "center"}}>
        	    	<AddIcon/>
            </Button>
        </ThemeProvider>
    )
}