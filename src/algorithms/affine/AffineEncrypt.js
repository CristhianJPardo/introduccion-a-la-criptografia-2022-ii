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

export const AffineEncrypt = (props) => {

    const letters = "abcdefghijklmnopqrstuvwxyz"

    const [nState, setNState] = React.useState("")
    const [clearText, setClearText] = React.useState("")
    const [error, setError] = React.useState(false)
    const [paramsFixed, setParamsFixed] = React.useState(false)
    const [encryptedText, setEncryptedText] = React.useState("")

    const changeEncryptedText = (text) => {
        let encryptedText = caesarCipher(text, parseInt(nState))
        setEncryptedText(encryptedText.toUpperCase())
    }

    const caesarCipher = (text, n) => {
        text = text.replace(/[^a-zA-Z]/g, '')
        text = text.toLowerCase()
        let encryptedText = ""
        for (let i = 0; i < text.length; i++) {
            let char = text.charAt(i)
            let aux = (((letters.indexOf(char) + n) % 26) + 26) % 26
            let encryptedChar = letters.charAt(aux)
            encryptedText = encryptedText + encryptedChar
        }
        return encryptedText
    }

    const validateAlphabeticAndSpace = (x) => {
        let bool = /^-?[1-9]+[0-9]*$/.test(x)
        setError(bool);

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
                    label="Enter the number of shifts"
                    placeholder="1"
                    helperText="Must be an integer (positive or negative)"
                    sx={{ width: "300px" }}
                    // onKeyUp={e => {
                    //     validateAlphabeticAndSpace(e.target.value);
                    //     changeNState(e.target.value)

                    // }}
                    onChange={e => {
                        validateAlphabeticAndSpace(e.target.value);
                        setNState(e.target.value)

                    }}
                    disabled={paramsFixed}
                    error={!error}
                    value={nState}
                />

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
                            setNState("");
                            setError(false);
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
            <Typography variant='h6'>Clear Text:</Typography>
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
                    onChange={e => {
                        setClearText(e.target.value);
                        changeEncryptedText(e.target.value);
                    }}
                    value={clearText}
                    disabled={!paramsFixed}
                />
            </Box>
            <Divider sx={{ mt: 2 }} />
            <Typography variant='h6'>Ciphertext:</Typography>
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