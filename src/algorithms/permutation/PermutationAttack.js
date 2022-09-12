import * as React from 'react';
import Paper from '@mui/material/Paper';
import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Grid, Typography } from '@mui/material';
import { permutationAttack } from './PermutationFunctions';
import { AttackComponents } from '../substitution/AttackComponents';

export const PermutationAttack = () => {

    const [clearText, setClearText] = React.useState("")
    const [permutations, setPermutations] = React.useState({})
    //const [clearData, setClearData] = React.useState([["a", 1],["b",2]])

    const permutationItems = Object.entries(permutations).map(([clave, valor], i) => {
        console.log(permutations)
        return (
            <AttackComponents
            key={i.toString()}
            clave={valor[0]}
            valor={valor[1]}
            />
        )
    })

    return (
        <Paper sx={{ width: "auto", margin: 'auto', overflow: 'hidden', pl: 2, pr: 2 }}>
            <Typography
                variant='h5'
                sx={{ mt: 2 }}
            >Permutation: Attack</Typography>
            <Divider sx={{ mt: 1, mb: 1 }} />
            <Typography variant='h6'
                sx={{ mb: 2 }}
            >Ciphertext:</Typography>
            <Box
                sx={{
                    // border: "1px solid red",
                    display: 'flex',
                    flexDirection: "column",
                    alignItems: "center",
                }}
            >
                <TextField
                    id="clear-text"
                    label="Enter the text you want to analyze"
                    placeholder="BUUBDLBUEPXO"
                    helperText="The special characters will be removed, in addition, the letters will be covered to uppercase"
                    onChange={e => {
                        setClearText(e.target.value);
                        setPermutations(permutationAttack(e.target.value))
                        //setClearData(permutationAttack(e.target.value));
                        //console.log(clearData)
                    }}
                    value={clearText}
                />
            </Box>
            <Divider sx={{ mt: 2 }} />
            <Typography variant='h6'>Attack Results:</Typography>
            <Box sx={{ display: 'grid', gridTemplateColumns: '1fr', p: 2, mb: 2, ml: 2, mt: 2 }}>
                <Box sx={{ m: 1 }}>
                    {permutationItems}
                </Box >
            </Box>

        </Paper>
    )
}
