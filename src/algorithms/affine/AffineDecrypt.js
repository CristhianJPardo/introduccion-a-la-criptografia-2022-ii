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
import CasinoIcon from '@mui/icons-material/Casino'

export const AffineDecrypt = (props) => {

    const letters = "abcdefghijklmnopqrstuvwxyz"

    const [a, setA] = React.useState("")
    const [b, setB] = React.useState("")
    const [clearText, setClearText] = React.useState("")
    const [errorA, setErrorA] = React.useState(false)
    const [errorB, setErrorB] = React.useState(false)
    const [paramsFixed, setParamsFixed] = React.useState(false)
    const [encryptedText, setEncryptedText] = React.useState("")

    const changeEncryptedText = (text) => {
        let encryptedText = D_Afin(text, a, b)
        setEncryptedText(encryptedText.toUpperCase())
    }

    //
    const Letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

    function gcd(m, n) {
        var gcd;
        while (true) {
            gcd = m % n;
            if (gcd == 0) {
                return n;
            }
            m = n;
            n = gcd;
        }
    }

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

    const getLetter = (n) => {
        return Letters[n % 26];
    }

    const C_Afin = (text, a, b) => {
        text = text.replace(/[^a-zA-Z]/g, '')
        var text_num = str2num(text);
        var cifrado = '';
        const size = text.length;

        for (let i = 0; i < size; i++) {
            var ind = 26 + parseInt(a) * parseInt(text_num[i]) + parseInt(b);
            cifrado += getLetter(ind);
        }

        return cifrado;
    }

    function Inv_mod(a, m = 26) {

        let m0 = m;
        let y = 0;
        let x = 1;

        if (m == 1)
            return 0;

        while (a > 1) {
            // q is quotient
            let q = parseInt(a / m);
            let t = m;

            // m is remainder now,
            // process same as
            // Euclid's algo
            m = a % m;
            a = t;
            t = y;

            // Update y and x
            y = x - q * y;
            x = t;
        }

        // Make x positive
        if (x < 0) {
            x += m0;
        }
        return x;
    }


    function D_Afin(text, a, b) { // Asumimos que la clave es como ["m", "d"]    
        text = text.replace(/[^a-zA-Z]/g, '')
        var text_num = str2num(text);
        var decifrado = '';
        const size = text.length;
        var ia = Inv_mod(a);
        for (let i = 0; i < size; i++) {
            var ind = 26 * 26 + parseInt(ia) * (parseInt(text_num[i]) - parseInt(b));
            decifrado += getLetter(ind);
        }
        return decifrado;
    }
    //
    const generateRandomA = () => {
        let isValid = false
        let randomNumber = 0
        while (!isValid) {
            randomNumber = Math.floor(Math.random() * 26)
            isValid = (gcd(randomNumber, 26) == 1)
        }
        return randomNumber
    }

    const validateA = (x) => {
        let bool1 = /^-?[1-9]+[0-9]*$/.test(x)
        let bool2 = (gcd(x, 26) == 1)
        let bool = (bool1 && bool2)
        setErrorA(bool);
    }
    const validateAlphabeticAndSpaceB = (x) => {
        let bool = /^-?[1-9]+[0-9]*$/.test(x)
        setErrorB(bool);
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
            >Affine: Decrypt</Typography>
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
                <Grid>
                    <TextField
                        id="param1"
                        label='Enter "a"'
                        placeholder="1"
                        helperText="Must be an integer
                    relatively prime to 26"
                        sx={{ width: "300px", mb: 2, ml: 5 }}
                        onChange={e => {
                            validateA(e.target.value);
                            setA(e.target.value)
                        }}
                        disabled={paramsFixed}
                        error={!errorA}
                        value={a}
                    />
                    <Tooltip title="Generate random key">
                        <IconButton sx={{ mt: 1 }}
                            disabled={paramsFixed}
                            onClick={() => {
                                setA(generateRandomA());
                                setErrorA(true);
                            }}
                        >
                            <CasinoIcon
                            />
                        </IconButton>
                    </Tooltip>
                </Grid>
                <TextField
                    id="param2"
                    label='Enter "b"'
                    placeholder="1"
                    helperText="Must be an integer"
                    sx={{ width: "300px" }}
                    onChange={e => {
                        validateAlphabeticAndSpaceB(e.target.value);
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
            <Typography variant='h6'>Ciphertext:</Typography>
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
                    helperText="The special characters will be removed, in addition, the letters will be covered to uppercase"
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