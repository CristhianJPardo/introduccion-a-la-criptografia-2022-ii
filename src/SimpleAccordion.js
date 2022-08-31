import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ListItemText from '@mui/material/ListItemText';
import DeviceHubIcon from '@mui/icons-material/DeviceHub';
import ComboBox from './ComboBox';

export default function SimpleAccordion() {

    return (
        <div>
            <Accordion disableGutters elevation={0} square>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon
                        sx={{ color: "white" }}
                    />}
                    // aria-controls="panel1a-content"
                    id="panel1a-header"
                    sx={{ bgcolor: '#101F33', color: "white", width: "300px", py: 0, px: 3 }}
                >
                    <DeviceHubIcon />
                    <ListItemText
                        sx={{ pl: 1.5 }}
                    >
                        Known Algorithm
                    </ListItemText>
                </AccordionSummary>
                <AccordionDetails sx={{ bgcolor: '#101F33', color: "white", py: 1, px: 3, }}>

                    {/* <Grouped /> */}
                    <ComboBox />

                </AccordionDetails>

            </Accordion>

        </div>
    );
}