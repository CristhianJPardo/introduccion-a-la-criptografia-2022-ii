import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { createTheme, ThemeProvider } from '@mui/material';
import { orange } from '@mui/material/colors';

export default function Grouped() {

    const [selectedAlgorithm, setSelectedAlgorithm] = React.useState("Algo por defecto")

    const handleSelectedAlgorithm = (e) => {
        if (e !== null) {
            setSelectedAlgorithm(e.name)
        } else {
            setSelectedAlgorithm("algo por defecto")
        }
    }

    const options = algorithms.map((option) => {
        const firstLetter = option.name[0].toUpperCase();
        return {
            firstLetter: /[0-9]/.test(firstLetter) ? '0-9' : firstLetter,
            ...option,
        };
    });

    const theme = createTheme({
        palette: {
            mode: "dark",
            // primary: {
            //     main: orange[500]
            // }
        }
    })


    return (
        <ThemeProvider theme={theme}>
            <Autocomplete
                id="grouped-demo"
                options={options}
                groupBy={(option) => option.category}
                getOptionLabel={(option) => option.name}
                onChange={(event, value) => handleSelectedAlgorithm(value)}
                sx={{
                    width: 300,
                    bgcolor: "#1e2f46",
                    borderRadius: "8px",
                    // input: { color: "white", } 
                }}
                renderInput={(params) => <TextField {...params}
                    label="Select the algorithm"
                    InputLabelProps={{
                        ...params.InputProps,
                        type: 'search',
                        // style: { color: "white" }
                    }} />}
            />
            {/* <p>
                {selectedAlgorithm}
            </p> */}
        </ThemeProvider>

    );
}


const algorithms = [
    { name: 'Shift', category: "Monoalphabetic" },
    { name: 'Substitution', category: "Monoalphabetic" },
    { name: 'Affine', category: "Monoalphabetic" },
    { name: 'Multiplicative', category: "Monoalphabetic" },
    { name: 'RSA', category: "Monoalphabetic" },
    { name: 'Vigenere', category: "Polyalphabetic" },
    { name: 'Hill', category: "Polyalphabetic" },
    { name: 'Permutation', category: "Polyalphabetic" },
    { name: 'Block chaining', category: "Polyalphabetic" },
    { name: 'Autokey', category: "Polyalphabetic" },
    { name: 'HillRIV', category: "Polyalphabetic" },
];