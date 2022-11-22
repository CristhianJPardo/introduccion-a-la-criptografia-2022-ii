import { Grid, Typography } from '@mui/material';
import { Box, Button } from '@mui/material'
import React, { useState } from 'react'
import axios from 'axios';
import { Divider, TextField } from '@mui/material';

export const RSAEncrypt = (props) => {

    const [textoEntrada, setTextoEntrada] = useState("")
    const [textRecibido, setTextoRecibido] = useState({})
    const [textEncriptado, setTextoEncriptado] = useState("")
    const [decipheredText, setDecipheredText] = useState("")
    const [p, setP] = useState("")
    const [q, setQ] = useState("")
    const [publicKeyE, setPublicKeyE] = useState("")
    const [publicKeyN, setPublicKeyN] = useState("")

    const enviarTexto = async () => {

        const data = {
            text: textoEntrada
        }
        try {
            const resp = await axios.post(
                "http://localhost:8000/rsa_encrypt/"
                + "?" + (new URLSearchParams({ p: p })).toString()
                + "&" + (new URLSearchParams({ q: q })).toString()
                , data)
            setTextoRecibido(resp.data);
            setTextoEncriptado(resp.data.encrypted);
            setPublicKeyE(resp.data.publicKeyE);
            setPublicKeyN(resp.data.publicKeyN);
            console.log(resp.data);
            console.log(textEncriptado);

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
        setTextoRecibido({});
        setTextoEncriptado("");
        setDecipheredText("");
        setP("");
        setQ("");
        setPublicKeyE("");
        setPublicKeyN("")
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
                sx={{ display: 'grid', gap: '4px', gridTemplateAreas: "'. . k1 k2 .'" }}
            >
                <TextField
                    sx={{
                        gridArea: 'k1',
                        mt: 2,
                        mb: 2,
                    }}
                    id="1"
                    label="p"
                    variant='outlined'
                    onChange={(e) => {
                        setP(e.target.value)
                        console.log(e.target.value)
                    }}
                    value={p}
                    error={!isNumeric(p)}
                // helperText={toBinary(p)}
                />
                <TextField
                    sx={{
                        gridArea: 'k2',
                        mt: 2,
                        mb: 2,
                    }}
                    id="2"
                    label="q"
                    variant='outlined'
                    onChange={(e) => {
                        setQ(e.target.value)
                        console.log(e.target.value)
                    }}
                    value={q}
                    error={!isNumeric(q)}
                // helperText={toBinary(q)}
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
                    id="3"
                    label="Clear Text"
                    variant='outlined'
                    onChange={(e) => {
                        setTextoEntrada(e.target.value)
                        console.log(e.target.value)
                    }}
                    value={textoEntrada}
                    error={!isNumeric(textoEntrada)}
                // helperText={toBinary(textoEntrada)}
                />
                <TextField
                    sx={{
                        mt: 2,
                        mb: 2,
                    }}
                    id="4"
                    label="Cyphertext"
                    variant='outlined'
                    value={textEncriptado}
                    disabled={true}
                // helperText={toBinary(textRecibido)}
                />
                <TextField
                    sx={{
                        mt: 2,
                        mb: 2,
                    }}
                    id="5"
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
                sx={{ display: 'grid', gap: '4px', gridTemplateAreas: "'. e . n .'" }}
            >
                <TextField
                    sx={{
                        gridArea: 'e',
                        mt: 2,
                        mb: 2,
                    }}
                    id="6"
                    label="Public Key e"
                    variant='outlined'
                    value={publicKeyE}
                    disabled={true}
                />
                <TextField
                    sx={{
                        gridArea: 'n',
                        mt: 2,
                        mb: 2,
                    }}
                    id="6"
                    label="Public Key n"
                    variant='outlined'
                    value={publicKeyN}
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

