import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ListItemText from '@mui/material/ListItemText';
import DeviceHubIcon from '@mui/icons-material/DeviceHub';
import AlgorithmAutocomplete from './AlgorithmAutocomplete';

export default function SimpleAccordion(props) {

    // const [estado, setEstado] = React.useState("Estado prueba")


    return (

        <Accordion disableGutters elevation={0} square>
            <AccordionSummary
                expandIcon={<ExpandMoreIcon
                    sx={{ color: "white" }}
                />}
                // aria-controls="panel1a-content"
                id="panel1a-header"
                sx={{ bgcolor: '#101F33', color: "white", width: "290px", py: 0, px: 3 }}
            >
                <DeviceHubIcon />
                <ListItemText
                    sx={{ pl: 1.5 }}
                >
                    Known Algorithm
                    {/* {props.prop1} */}
                </ListItemText>
            </AccordionSummary>
            <AccordionDetails sx={{ bgcolor: '#101F33', py: 1, px: 3, }}>

                <AlgorithmAutocomplete
                    prop1={props.prop1}
                    prop2={props.prop2}
                />

            </AccordionDetails>

        </Accordion>


    );
}