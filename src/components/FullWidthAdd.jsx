import * as React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import AddIcon from '@mui/icons-material/Add';
import { Button, Tooltip } from '@mui/material';



export default function FullWidthAdd({onClick, tooltip, disabled}) {
    return (
        <ThemeProvider
            theme={createTheme()}>
            <Tooltip title={tooltip}>
                <span>
                <Button disabled={disabled} onClick={onClick} sx={{ border: 1, borderRadius: '5px', width: "100%", display: "flex", justifyContent: "center", alignItems: "center"}}>
                    <AddIcon/>
                </Button>
                </span>
            </Tooltip>
        </ThemeProvider>
    )
}