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
import { keyAndInverseSearcher } from './HillFunctions';

export const HillAttack = () => {
    const letters = "abcdefghijklmnopqrstuvwxyz"

    const [a, setA] = React.useState("")
    const [b, setB] = React.useState("")
    const [clearText, setClearText] = React.useState("")
    const [errorA, setErrorA] = React.useState(false)
    const [errorB, setErrorB] = React.useState(false)
    const [paramsFixed, setParamsFixed] = React.useState(false)
    const [encryptedText, setEncryptedText] = React.useState("")

    const changeEncryptedText = () => {
        let encryptedText = keyAndInverseSearcher(str2num(a), str2num(b));
        let key = "";
        for (let i = 0; i < encryptedText.length; i++) {
            for (let j = 0; j < encryptedText.length; j++) {
                key += (encryptedText[i][j] % 26).toString();
                key += "  "
            }
            key += "| "
        }
        setEncryptedText(key)
    }

    const Letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

    const str2num = (str) => {
        let num = [];
        for (let i = 0; i < str.length; i++) {
            num.push(getNumber(str[i]).toString());
        }
        return num;
    }

    const getNumber = (a) => {
        let i = 0;
        let a_up = a.toUpperCase();
        while (a_up != Letters[i]) {
            i++;
        }
        return i;
    }

    const validateA = (x) => {
        x = x.replace(/[^a-zA-Z]/g, '')
        let validLength = x.length >= 1;
        setErrorA(validLength);
    }

    const validateAlphabeticAndSpaceB = (x, y) => {
        x = x.replace(/[^a-zA-Z]/g, '')
        y = y.replace(/[^a-zA-Z]/g, '')
        let validLength = x.length === y.length;
        setErrorB(validLength);
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
            >Affine: Encrypt</Typography>
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
                    label='Enter known clear text'
                    placeholder=""
                    multiline
                    helperText="The special characters will be removed"
                    sx={{ width: "300px", mb: 2, ml: 5 }}
                    onChange={e => {
                        validateA(e.target.value);
                        setA(e.target.value)
                        // console.log(a)
                    }}
                    disabled={paramsFixed}
                    error={!errorA}
                    value={a}
                />
                <TextField
                    id="param2"
                    label='Enter corresponding ciphertext'
                    placeholder=""
                    multiline
                    helperText="The special characters will be removed"
                    sx={{ width: "300px", mb: 2, ml: 5 }}
                    onChange={e => {
                        validateAlphabeticAndSpaceB(a, e.target.value);
                        setB(e.target.value)
                    }}
                    disabled={paramsFixed}
                    error={!errorB}
                    value={b}
                />

                <Box sx={{ mb: 0 }}>
                    <Button
                        variant="contained"
                        color="primary"
                        sx={{ mr: 0.5, ml: 0.5 }}
                        onClick={() => {
                            if (!errorA || !errorB) {
                                alert("You can't set the parameters with wrong values")
                            } else {
                                setParamsFixed(true)
                                changeEncryptedText();
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
                            setA("");
                            setB("");
                            setErrorA(false);
                            setErrorB(false);
                            setParamsFixed(false);
                            setEncryptedText("")
                            setClearText("")
                        }}
                    >
                        Reset
                    </Button>
                </Box>
            </Box>
            <Divider sx={{ mt: 2 }} />
            <Typography variant='h6'>Key:</Typography>
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