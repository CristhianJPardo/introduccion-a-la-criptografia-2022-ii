import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { createTheme, ThemeProvider } from '@mui/material';
// import { orange } from '@mui/material/colors';

export default function ComboBox() {

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
                disablePortal
                id="combo-box-demo"
                options={algorithms}
                groupBy={(option) => option.category}
                color="secondary"
                sx={{ width: 200 }}
                renderInput={(params) => <TextField {...params} label="Select the algoritm" />}
            />
        </ThemeProvider>
    );
}

const algorithms = [
    { label: 'Shift', category: "Monoalphabetic" },
    { label: 'Substitution', category: "Monoalphabetic" },
    { label: 'Affine', category: "Monoalphabetic" },
    { label: 'Multiplicative', category: "Monoalphabetic" },
    { label: 'RSA', category: "Monoalphabetic" },
    { label: 'Vigenere', category: "Polyalphabetic" },
    { label: 'Hill', category: "Polyalphabetic" },
    { label: 'Permutation', category: "Polyalphabetic" },
    { label: 'Block chaining', category: "Polyalphabetic" },
    { label: 'Autokey', category: "Polyalphabetic" },
    { label: 'HillRIV', category: "Polyalphabetic" },
];