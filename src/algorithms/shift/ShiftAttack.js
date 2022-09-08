import * as React from 'react';
import Paper from '@mui/material/Paper';
import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Typography } from '@mui/material';
import { AttackComponents } from './AttackComponents';

export const ShiftAttack = () => {
    const letters = "abcdefghijklmnopqrstuvwxyz"

    const keysOfDeciphertexts = [...Array(26).keys()]

    const [clearText, setClearText] = React.useState("")
    const initialEncryptedTexts = Array(26).fill('')
    const [encryptedTexts, setEncryptedTexts] = React.useState(initialEncryptedTexts)

    const caesarDecipher = (text, n) => {
        text = text.replace(/[^a-zA-Z]/g, '')
        text = text.toLowerCase()
        let encryptedText = ""
        for (let i = 0; i < text.length; i++) {
            let char = text.charAt(i)
            let aux = (((letters.indexOf(char) - n) % 26) + 26) % 26
            let encryptedChar = letters.charAt(aux)
            encryptedText = encryptedText + encryptedChar
        }
        return encryptedText
    }

    // const numbers = [1, 2, 3, 4, 5];
    const listItems = encryptedTexts.map((text, i) => {
        return (
            <AttackComponents
                key={i.toString()}
                n={i.toString()}
                content={text.toString()}
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
                        setEncryptedTexts(encryptedTexts.map((x, i) => caesarDecipher(e.target.value, i), encryptedTexts))
                    }}
                    value={clearText}
                // disabled={!paramsFixed}
                />
            </Box>
            <Divider sx={{ mt: 2 }} />
            <Typography variant='h6'>Attack Results:</Typography>


            <ul>{listItems}</ul>
            {console.log(encryptedTexts)}
        </Paper>

    )
}
