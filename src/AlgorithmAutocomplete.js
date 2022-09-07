import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { createTheme, ThemeProvider } from '@mui/material';

const AlgorithmAutocomplete = (props) => {
    const [selectedAlgorithm2, setSelectedAlgorithm2] = useState(null);

    const theme = createTheme({
        palette: {
            mode: "dark",
            // primary: {
            //     main: orange[500]
            // }
        }
    })

    const algorithms = [
        { id: 1, name: 'Affine', group: "Monoalphabetic" },
        { id: 2, name: 'Shift', group: "Monoalphabetic" },
        { id: 3, name: 'Substitution', group: "Monoalphabetic" },
        { id: 4, name: 'Hill', group: "Polyalphabetic" },
        { id: 5, name: 'Permutation', group: "Polyalphabetic" },
        { id: 6, name: 'Vigenere', group: "Polyalphabetic" },
    ];

    console.log(selectedAlgorithm2);

    return (
        <ThemeProvider theme={theme}>
            <Autocomplete
                id="nba teams"
                disablePortal
                options={algorithms}
                groupBy={(option) => option.group}
                renderInput={params => (
                    <TextField {...params} label="Select the algorithm" variant="outlined" />
                )}
                getOptionLabel={option => option.name}
                isOptionEqualToValue={(option, value) => option.id === value.id}
                style={{ width: 240 }}
                value={selectedAlgorithm2}
                onChange={(_event, newAlgo) => {
                    setSelectedAlgorithm2(newAlgo);
                    props.prop2(newAlgo?.name);
                }}
            />

            {/* <Typography>{selectedAlgorithm2?.name}</Typography> */}
        </ThemeProvider>
    );
};



export default AlgorithmAutocomplete;