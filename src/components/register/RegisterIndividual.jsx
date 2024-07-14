import { Button } from "@mui/material";
import { Box, display, height } from "@mui/system";

export default function RegisterIndividual(e) {
    const person = e.person;

    return (
        <Box style={{border: "1px black solid", borderRadius: "5px", padding: "10px", height: "40px"}}>
            <p style={{margin: "auto", display: "inline-block"}}>{person.firstName} {person.lastName}</p>
            <Button style={{float: "right", display: "inline-block"}}>world</Button>
            <Button style={{float: "right", display: "inline-block"}}>Hello</Button>
        </Box>
    )
}