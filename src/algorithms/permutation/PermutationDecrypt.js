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
import { permutationDecrypt } from './PermutationFunctions';

export const PermutationDecrypt = (props) => {

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
        let encryptedText = permutationDecrypt(text, Array.from(nState.toString()).map(Number))
        setEncryptedText(encryptedText.toUpperCase())
    }

    const validatePermutation = (input) => {
        let isNumber = /^-?[1-9]+[0-9]*$/.test(input);
        let key = Array.from(input.toString()).map(Number);
        let expectedKey = Array.from({length: key.length}, (_, i) => i + 1)
        let validKey = JSON.stringify(key.sort())===JSON.stringify(expectedKey);
        let validLength = key.length>=2 && key.length<=6;
        setError(isNumber && validKey && validLength);
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
            >Permutation: Decrypt</Typography>
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
                    label="Enter the permutation"
                    helperText="Must be a permutation of length between 2 and 6, e.g. 2413"
                    sx={{ width: "300px" }}
                    // onKeyUp={e => {
                    //     validateAlphabeticAndSpace(e.target.value);
                    //     changeNState(e.target.value)

                    // }}
                    onChange={e => {
                        validatePermutation(e.target.value);
                        setNState(e.target.value)

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
            <Typography variant='h6'>Cipherext:</Typography>
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
                    label="Enter the text you want to cipher"
                    placeholder="attack at down"
                    helperText="The special characters will be removed, in addition, the letters will be covered to lowercase"
                    // onKeyUp={e => changeEncryptedText(e.target.value)}
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
                    // border: "1px solid red",
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
                            // overflowY: "auto",
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
