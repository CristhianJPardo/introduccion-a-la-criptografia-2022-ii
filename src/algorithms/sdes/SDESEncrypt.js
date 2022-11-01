
import { Grid, Typography } from '@mui/material';
import { Box, Button } from '@mui/material'
import React, { useState } from 'react'
import axios from 'axios';
import { Divider, TextField } from '@mui/material';

export const SDESEncrypt = (props) => {

    const [textoEntrada, setTextoEntrada] = useState("")
    const [textRecibido, setTextoRecibido] = useState("")
    const [decipheredText, setDecipheredText] = useState("")
    const [key, setKey] = useState("")

    const enviarTexto = async () => {
        const data = {
            text: textoEntrada
        }
        try {
            const resp = await axios.post(
                "http://localhost:8000/upload_sdes_encrypt/"
                + "?" + (new URLSearchParams({ key: key })).toString()
                , data)
            setTextoRecibido(resp.data)
            console.log(resp.data)

        } catch (err) {
            console.error(err)
        }
    }

    const decrypt = () => {
        setTimeout(
            () => { setDecipheredText(textoEntrada) },
            1000
        );
    }

    const clear = () => {
        setTextoEntrada("");
        setTextoRecibido("");
        setDecipheredText("");
        setKey("")
    }

    const isNumeric = (str) => {
        return !isNaN(str) && !isNaN(parseFloat(str))
    }

    const toBinary = (str) => {
        if (isNumeric(str)) {
            return parseFloat(str).toString(2).padStart(64)
        }
    }

    return (
        <Box>
            <Grid
                sx={{ display: 'grid', gap: '4px', gridTemplateAreas: "'. . k . .'" }}
            >
                <TextField
                    sx={{
                        gridArea: 'k',
                        mt: 2,
                        mb: 2,
                    }}
                    id="1"
                    label="Key"
                    variant='outlined'
                    onChange={(e) => {
                        setKey(e.target.value)
                        console.log(e.target.value)
                    }}
                    value={key}
                    error={!isNumeric(key)}
                    helperText={toBinary(key)}
                />
            </Grid>
            <Grid
                sx={{ display: 'grid', justifyContent: 'center', alignContent: 'center', gridTemplateColumns: '1fr 1fr 1fr', gap: '4px', mb: 1 }}
            >
                <TextField
                    sx={{
                        mt: 2,
                        mb: 2,
                    }}
                    id="2"
                    label="Clear Text"
                    variant='outlined'
                    onChange={(e) => {
                        setTextoEntrada(e.target.value)
                        console.log(e.target.value)
                    }}
                    value={textoEntrada}
                    error={!isNumeric(textoEntrada)}
                    helperText={toBinary(textoEntrada)}
                />
                <TextField
                    sx={{
                        mt: 2,
                        mb: 2,
                    }}
                    id="3"
                    label="Cyphertext"
                    variant='outlined'
                    onChange={(e) => {
                        setTextoEntrada(e.target.value)
                        console.log(e.target.value)
                    }}
                    value={textRecibido}
                    disabled={true}
                    helperText={toBinary(textRecibido)}
                />
                <TextField
                    sx={{
                        mt: 2,
                        mb: 2,
                    }}
                    id="4"
                    label="Decypheredtext"
                    variant='outlined'
                    onChange={(e) => {
                        setTextoEntrada(e.target.value)
                        console.log(e.target.value)
                    }}
                    value={decipheredText}
                    disabled={true}
                />

            </Grid>
            <Grid
                sx={{ display: 'grid', gap: '4px', gridTemplateAreas: "'. b1 c1 b2 .'" }}
            >
                <Button
                    variant='contained'
                    sx={{
                        gridArea: 'b1',
                        mt: 2,
                        mb: 2,
                    }}
                    onClick={enviarTexto}
                >
                    Encrypt
                </Button>
                <Button
                    variant='contained'
                    color='secondary'
                    sx={{
                        gridArea: 'c1',
                        mt: 2,
                        mb: 2,
                    }}
                    onClick={clear}
                >
                    Clear
                </Button>
                <Button
                    variant='contained'
                    sx={{
                        gridArea: 'b2',
                        mt: 2,
                        mb: 2,
                    }}
                    onClick={decrypt}
                >
                    Decrypt
                </Button>
            </Grid >
        </Box>
    )
}

