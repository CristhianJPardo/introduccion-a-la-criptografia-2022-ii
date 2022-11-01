import * as React from 'react';
import Paper from '@mui/material/Paper';
// import { MathComponent } from "mathjax-react";
import Divider from '@mui/material/Divider';
import { Typography } from '@mui/material';
import carga from './carga.png'

export const GammaInfo = () => {
    return (
        <Paper sx={{ width: "auto", margin: 'auto', overflow: 'hidden', pl: 2, textAlign: "left" }}>
            <Typography
                variant='h5'
                sx={{ mt: 2 }}
            >Gamma Pentagonal : Info</Typography>
            <Divider sx={{ mt: 1, mb: 1 }} />
            <Typography variant='h6'>Gamma Pentagonal cipher</Typography>
            <br></br>
            <img
                className='center'
                src={carga}
                alt='imagen 1'
                style={{
                    width: "500px",
                }}
            />
        </Paper>
    )
}
