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
import { Boxes } from './Boxes';

export const SubstitutionEncrypt = (props) => {

    const letters = "abcdefghijklmnopqrstuvwxyz"

    const [alphabet, setAlphabet] = React.useState("")

    const [clearText, setClearText] = React.useState("")
    const [errorAlphabet, setErrorAlphabet] = React.useState(false)
    const [paramsFixed, setParamsFixed] = React.useState(false)
    const [encryptedText, setEncryptedText] = React.useState("")

    const changeEncryptedText = (text) => {
        let encryptedText = (text, alphabet)
        setEncryptedText(encryptedText.toUpperCase())
    }

    const validateAlphabet = (text) => {
        // validar que solo hayan 26 letras
        text = text.toLowerCase()
        let bool1 = (text.length == 26)
        // validar que estén todas las letras
        let bool2 = true
        let letrasEncriptadas = text.split("")
        for (const letra of letrasEncriptadas) {
            if (!letters.includes(letra)) {
                bool2 = false
            }
        }
        //validar que no tenga caracteres repetidos
        let bool3 = !/(.).*\1/.test(text)
        let bool = bool1 && bool2 && bool3
        setErrorAlphabet(bool)
    }

    const handleChangeOnA = (x) => {
        x = x.replace(/[^a-zA-Z]/g, '')

        let letras = x.split("")
        let indices = letras.map((letra, i) => {
            letters.indexOf(letra)
        })
        setAlphabet(x)
    }
    //
    const boxItems = alphabet.split("").map((letraCifrada, i) => {
        if (i < 26) {
            return (

                <Boxes
                    key={i.toString()}
                    letraClara={letters[i]}
                    letraCifrada={letraCifrada}
                />

            )
        }

    })

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
            >Substitution: Encrypt</Typography>
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
                        label='Enter the substitution list'
                        placeholder="1"
                        helperText="Must be an string of lenght 26 (with chars in range a-z) without repeated chars"
                        sx={{ width: "300px", mb: 2, ml: 5 }}
                        onChange={e => {
                            validateAlphabet(e.target.value);
                            setAlphabet(e.target.value)
                            // console.log(a)
                        }}
                        disabled={paramsFixed}
                        error={!errorAlphabet}
                        value={alphabet}
                    />
                    <Tooltip title="Generate random key">
                        <IconButton sx={{ mt: 1 }}
                            disabled={paramsFixed}
                            onClick={() => {
                                // setA(generateRandomA());
                                // setErrorA(true);
                            }}
                        >
                            <CasinoIcon
                            />
                        </IconButton>
                    </Tooltip>
                </Grid>

                {/* Renderizar cajas */}
                <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(26, 1fr)', mb: 2 }}>
                    {boxItems}
                </Box>

                <Box sx={{ mb: 0 }}>
                    <Button
                        variant="contained"
                        color="primary"
                        sx={{ mr: 0.5, ml: 0.5 }}
                        onClick={() => {
                            if (!errorAlphabet) {
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
                            setAlphabet("");

                            setErrorAlphabet(false);

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