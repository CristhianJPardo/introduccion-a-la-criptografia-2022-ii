import * as React from 'react';
import Paper from '@mui/material/Paper';
import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Grid, Typography } from '@mui/material';
import { AttackComponents } from './AttackComponents';

export const SubstitutionAttack = () => {


    const keysOfDeciphertexts = [...Array(26).keys()]
    const [clearText, setClearText] = React.useState("")
    const [frequencyTexts, setFrequencyTexts] = React.useState({})
    const [unigrams, setUnigrams] = React.useState({})
    const [bigrams, setBigrams] = React.useState({})
    const [trigrams, setTrigrams] = React.useState({})
    const [tetragrams, setTetragrams] = React.useState({})


    function frequencyTable(text, n) {
        text = text.replace(/[^a-zA-Z]/g, '')
        if (n == 1) {
            var frequencyTable = { 'A': 0, 'B': 0, 'C': 0, 'D': 0, 'E': 0, 'F': 0, 'G': 0, 'H': 0, 'I': 0, 'J': 0, 'K': 0, 'L': 0, 'M': 0, 'N': 0, 'O': 0, 'P': 0, 'Q': 0, 'R': 0, 'S': 0, 'T': 0, 'U': 0, 'V': 0, 'W': 0, 'X': 0, 'Y': 0, 'Z': 0 };
        } else {
            var frequencyTable = {};
        }
        for (let i = 0; i < text.length; i++) {
            // n-grams
            if (i < text.length - (n - 1)) {
                if (text.substring(i, i + n) in frequencyTable)
                    frequencyTable[text.substring(i, i + n)] += 1;
                else
                    frequencyTable[text.substring(i, i + n)] = 1;
            }
        }
        for (var key in frequencyTable) {
            if (key.length > 1 && frequencyTable[key] == 1)
                delete frequencyTable[key];
        }
        var orderedFreqT =
            Object.keys(frequencyTable).sort().reduce((obj, key) => { obj[key] = frequencyTable[key]; return obj; }, {});
        return orderedFreqT
    }

    // function substitutionCryptoAnalysis(text) {
    //     let unigram = frequencyTable(text, 1);
    //     let digram = frequencyTable(text, 2);
    //     let trigram = frequencyTable(text, 3);
    //     let quadrigram = frequencyTable(text, 4);
    //     return Object.assign({}, unigram, digram, trigram, quadrigram);
    // }

    const unigramsItems = Object.entries(unigrams).map(([clave, valor], i) => {
        return (
            <AttackComponents
                key={i.toString()}
                clave={clave}
                valor={valor}
            />
        )
    })

    const bigramsItems = Object.entries(bigrams).map(([clave, valor], i) => {
        return (
            <AttackComponents
                key={i.toString()}
                clave={clave}
                valor={valor}
            />
        )
    })
    const trigramsItems = Object.entries(trigrams).map(([clave, valor], i) => {
        return (
            <AttackComponents
                key={i.toString()}
                clave={clave}
                valor={valor}
            />
        )
    })
    const tetragramsItems = Object.entries(tetragrams).map(([clave, valor], i) => {
        return (
            <AttackComponents
                key={i.toString()}
                clave={clave}
                valor={valor}
            />
        )
    })


    return (

        <Paper sx={{ width: "auto", margin: 'auto', overflow: 'hidden', pl: 2, pr: 2 }}>
            <Typography
                variant='h5'
                sx={{ mt: 2 }}
            >Shift: Attack</Typography>
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
                    label="Enter the text you want to decipher"
                    placeholder="BUUBDLBUEPXO"
                    helperText="The special characters will be removed, in addition, the letters will be covered to uppercase"
                    onChange={e => {
                        setClearText(e.target.value);
                        // console.log(e.target.value);
                        setUnigrams(frequencyTable(e.target.value, 1))
                        setBigrams(frequencyTable(e.target.value, 2))
                        setTrigrams(frequencyTable(e.target.value, 3))
                        setTetragrams(frequencyTable(e.target.value, 4))
                    }}
                    value={clearText}
                />
            </Box>
            <Divider sx={{ mt: 2 }} />
            <Typography variant='h6'>Attack Results:</Typography>
            <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr' }}>
                <Box sx={{ m: 1 }}>
                    {unigramsItems}
                </Box >
                <Box sx={{ m: 1 }}>
                    {bigramsItems}
                </Box >
                <Box sx={{ m: 1 }}>
                    {trigramsItems}
                </Box>
                <Box sx={{ m: 1 }}>
                    {tetragramsItems}
                </Box>
            </Box>
        </Paper>

    )
}
