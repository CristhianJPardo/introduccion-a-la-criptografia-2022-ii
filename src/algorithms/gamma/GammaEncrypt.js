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
import { TestGrafo } from './TestGrafo';
import { TestPermutacion } from './TestPermutacion';
import grafo from './grafo.png'
import permutacion from './permutacion.png'
import { useState } from 'react';

export const GammaEncrypt = (props) => {
    const [base, setBase] = useState(false)
    const [x, setX] = useState("")

    return (
        <div>
            <Typography sx={{ mb: 2 }}>
                <a href='http://localhost:3001/'>Ir a Gamma Pentagonal!</a>
            </Typography>
            {/* <TestGrafo /> */}
            {/* -8 en x -6 y */}
            <Grid>
                <TextField
                    id="param1"
                    label='Enter X'
                    placeholder="0"
                    helperText="Must be an integer"
                    sx={{ width: "300px", mb: 2, ml: 5 }}
                    onChange={e => {
                        // validateAlphabet(e.target.value);
                        setX(e.target.value)
                        // // console.log(a)
                    }}
                    disabled={false}
                    error={false}
                    value={x}
                />
                <TextField
                    id="param2"
                    label='Enter Y'
                    placeholder="0"
                    helperText="Must be an integer"
                    sx={{ width: "300px", mb: 2, ml: 5 }}
                    onChange={e => {
                        // validateAlphabet(e.target.value);
                        // setAlphabet(e.target.value)
                        // // console.log(a)
                    }}
                    disabled={false}
                    error={false}
                // value={"alphabet"}
                />
                <TextField
                    id="param3"
                    label='Enter permutation'
                    placeholder="0, 1, 2, 3, 4, 5, 6, 7, 8, 9"
                    helperText="Must be comma separated list of integers"
                    sx={{ width: "300px", mb: 2, ml: 5 }}
                    onChange={e => {
                        // validateAlphabet(e.target.value);
                        // setAlphabet(e.target.value)
                        // // console.log(a)
                    }}
                    disabled={false}
                    error={false}
                // value={"alphabet"}
                />
                <TextField
                    id="param4"
                    label='Clear text'
                    placeholder="attackatdown"
                    helperText="Must be an string"
                    sx={{ width: "300px", mb: 2, ml: 5 }}
                    onChange={e => {
                        // validateAlphabet(e.target.value);
                        // setAlphabet(e.target.value)
                        // // console.log(a)
                    }}
                    disabled={false}
                    error={false}
                // value={"alphabet"}
                />
                <Button
                    variant="contained"
                    color="primary"
                    sx={{ mr: 0.5, ml: 5, mt: 1 }}
                    onClick={() => {
                        setTimeout(
                            () => { setBase(true) },
                            2000
                        )
                    }}
                    disabled={false}

                >Generate!</Button>

            </Grid>
            {base ? <img
                className='center'
                src={grafo}
                alt='imagen 1'
                style={{
                    width: "500px",
                }}
            /> : ""}
            {base ? <img
                className='center'
                src={permutacion}
                alt='imagen 1'
                style={{
                    width: "500px",
                }}
            /> : ""}
            {
                base ? "(22,19),(4,21),(0,21),(23,11),(5,25),(4,23),(16,9),(12,22),(23,18),(7,0),(0,23),(23,12),(4,25),(4,24),(25,22),(8,4),(25,16),(23,11),(4,4),(7,22),(7,2),(18,5),(20,12),(9,1),(0,19),(17,9),(3,1),(19,9),(4,4),(7,22),(20,15),(18,5),(8,0),(1,18),(7,3),(3,22),(22,15),(21,10),(20,15),(14,7),(2,25),(14,1),(4,25),(22,13),(25,21),(3,22),(0,17),(8,20),(7,7),(9,23),(20,15),(22,13),(10,2),(12,2),(2,1),(7,3),(16,9),(6,18),(24,19),(9,23),(17,14),(1,18),(4,25),(5,22),(5,25),(16,8),(4,2),(1,14),(23,17),(8,1),(20,15),(24,10),(22,17),(0,20),(23,18),(6,24),(7,5),(12,22),(23,18),(14,7),(17,14),(6,23),(17,6),(0,20),(22,17),(23,14),(4,2),(21,10),(2,22),(9,23),(17,14),(4,21),(18,13),(19,8),(17,11),(4,0),(18,12),(8,23),(24,19),(7,0),(9,1),(7,22),(13,3),(23,11),(22,17),(0,15),(4,2),(0,15),(0,0),(12,5),(15,12),(15,2),(4,25),(22,12),(12,7),(17,9),(0,17),(13,25),(4,4),(7,0),(11,5),(21,9),(20,14),(19,8),(21,16),(1,20),(18,12),(8,23),(2,22),(9,23),(0,23),(17,8),(0,21),(3,21),(16,10),(4,0),(0,17),(12,22),(2,2),(7,0),(15,10),(18,5),(17,6),(19,8),(10,5),(1,20),(20,13),(12,22),(18,14),(15,8),(11,8),(4,21),(22,17),(19,8),(21,16),(4,0),(0,17),(13,25),(4,4),(12,5),(19,16),(18,5),(10,2),(0,20),(21,20),(4,0),(7,24),(12,4),(18,14),(17,10),(9,1),(2,19),(16,9),(17,6),(9,4),(18,10),(22,15),(23,11),(0,0),(7,20),(11,8),(4,21),(17,6),(12,2),(9,4),(4,0),(7,24),(13,5),(3,3),(25,15),(9,1),(21,9),(20,14),(12,2),(16,10),(15,7),(3,1),(14,6),(6,6),(11,4),(0,23),(21,9),(18,13),(4,24),(22,17),(7,3),(4,2),(11,3),(20,15),(2,17),(14,11),(20,11),(18,13),(4,24),(7,3),(3,22),(17,11),(10,21),(2,22),(6,19),(19,16),(2,19),(10,2),(4,24),(22,17),(6,2),(8,6),(0,13),(4,4),(2,17),(14,11),(20,11),(10,2),(4,24),(16,10),(20,11),(5,3),(25,12),(11,11),(8,1),(15,10),(7,22),(16,9),(23,11),(17,11),(3,22),(0,17),(8,0),(18,14),(13,6),(1,24),(20,11),(20,14),(17,6),(21,13),(8,25),(4,2),(19,9),(17,13),(25,15),(9,1),(0,17),(20,12),(0,20),(1,0),(15,7),(4,2),(10,21),(4,4),(21,14),(11,5),(2,19),(4,25),(22,12),(5,25),(23,13),(4,2),(12,4),(18,14),(17,10),(9,1),(2,19),(16,9),(17,6),(18,14),(15,7),(8,6),(8,20),(0,0),(19,12),(9,1),(3,20),(20,14),(9,1),(7,3),(1,20),(7,24),(19,9),(4,4),(9,23),(11,8),(4,21),(4,23),(22,13),(21,16),(18,10),(17,11),(8,0),(2,2),(6,19),(15,10),(3,20),(20,14),(9,1),(7,3),(1,20),(0,18),(21,10),(4,4),(19,12),(10,4),(4,21),(13,3),(19,7),(23,18),(4,0),(22,15),(13,5),(4,4),(19,12),(19,16),(18,5),(4,23),(19,8),(16,10),(15,7),(4,2),(8,20),(24,19),(18,11),(19,16),(18,5),(20,12),(4,24),(5,25),(17,9),(3,1),(21,10),(4,4),(13,6),(6,0),(3,20),(13,3),(7,25),(9,4),(4,0),(22,15),(12,22),(17,13),(19,12),(12,7),(8,25),(16,8),(6,23),(22,17),(18,10),(5,3),(8,0),(17,13),(11,24),(14,11),(17,8),(18,7),(0,20),(23,18),(8,4),(18,12),(13,5)" : ""
            }
        </div>

    )
}