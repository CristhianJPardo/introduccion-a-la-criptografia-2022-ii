import * as React from 'react';
import Paper from '@mui/material/Paper';
import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Grid, Typography } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import { D_Vigenere } from './Vigenerefunctions';

export const VigenereDecrypt = (props) => {

    const initialNState = ""
    const [nState, setNState] = React.useState(initialNState)
    const initialError = false
    const initialClearText = ""
    const [clearText, setClearText] = React.useState(initialClearText)
    const [error, setError] = React.useState(initialError)
    const initialParamsFixed = false
    const [paramsFixed, setParamsFixed] = React.useState(initialParamsFixed)
    const initialEncryptedText = ""
    const [encryptedText, setEncryptedText] = React.useState(initialEncryptedText)

    const changeEncryptedText = (text) => {
        let encryptedText = D_Vigenere(text, nState)
        setEncryptedText(encryptedText.toUpperCase())
    }

    const validateLettersOnly = (input) => {
        let isString = /[^a-z]/gi.test(input);
        let validLength = input.length <= 15;
        setError(!isString && validLength);
    }

    return (

        <Paper sx={{
            width: "auto",
            margin: 'auto',
            overflow: 'hidden',
            pl: 2,
            pr: 2
        }}>
            <Typography
                variant='h5'
                sx={{ mt: 2 }}
            >Vigenere: Decrypt</Typography>
            <Divider sx={{ mt: 1, mb: 1 }} />
            <Typography variant='h6'>Parameters:</Typography>
            <Box
                sx={{
                    // border: "1px solid red",
                    display: 'flex',
                    flexDirection: "column",
                    alignItems: "center"
                }}
            >
                <TextField
                    id="param1"
                    label="Enter the key word"
                    helperText="Words with a maximum size 15, e.g., TheKey"
                    sx={{ width: "300px" }}
                    onChange={e => {
                        validateLettersOnly(e.target.value);
                        setNState(e.target.value);
                    }}
                    disabled={paramsFixed}
                    error={!error}
                    value={nState}


                />

                {/* Debuggeando */}
                {/* {error.toString()}
                    <br />
                    {nState}
                    <br />
                    {paramsFixed.toString()}
                    <br />
                    {nState} */}
                <Box sx={{ mb: 0 }}>
                    <Button
                        variant="contained"
                        color="primary"
                        sx={{ mr: 0.5, ml: 0.5 }}
                        onClick={() => {
                            if (!error) {
                                alert("You can't set the parameters with wrong values")
                            } else {
                                setParamsFixed(true)
                            }
                        }}
                        disabled={paramsFixed}
                    >
                        {!paramsFixed ? "Set parameters" : "Parameters seted"}
                    </Button>
                    <Button
                        variant="contained"
                        color="secondary"
                        onClick={() => {
                            // alert("intentando reiniciar");
                            setNState(initialNState);
                            setError(initialError);
                            setParamsFixed(initialParamsFixed);
                            setEncryptedText(initialEncryptedText)
                            setClearText(initialClearText)
                        }}
                    >
                        Reset
                    </Button>
                </Box>
            </Box>
            <Divider sx={{ mt: 2 }} />
            <Typography variant='h6'>Ciphertext:</Typography>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: "column",
                    alignItems: "center",
                }}
            >
                <TextField
                    id="clear-text"
                    label="Enter the text you want to cipher"
                    multiline
                    helperText="The special characters will be removed, in addition, the letters will be covered to lowercase"
                    onChange={e => {
                        setClearText(e.target.value);
                        changeEncryptedText(e.target.value);
                    }}
                    value={clearText}
                    disabled={!paramsFixed}
                />
            </Box>
            <Divider sx={{ mt: 2 }} />
            <Typography variant='h6'>Clear Text:</Typography>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: "column",
                    alignItems: "center",

                }}
            >
                <Grid container alignItems="center">
                    <Box
                        sx={{
                            width: "60vw",
                            maxWidth: "65vw",
                            bgcolor: "#ccc",
                            borderRadius: "8px",
                            p: 2,
                            mb: 3,
                            ml: 5,
                            mt: 3,
                            height: "auto",
                            overflowWrap: 'break-word'
                        }}
                    >
                        {encryptedText}
                    </Box>
                    <Tooltip title="Copy to Clipboard">
                        <IconButton
                            onClick={() => {
                                navigator.clipboard.writeText(encryptedText)
                            }}
                        >
                            <ContentCopyIcon sx={{ m: 0 }} />
                        </IconButton>
                    </Tooltip>
                </Grid>

            </Box>
        </Paper>

    )
}