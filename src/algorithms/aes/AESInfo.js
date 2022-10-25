import * as React from 'react';
import Paper from '@mui/material/Paper';
// import { MathComponent } from "mathjax-react";
import Divider from '@mui/material/Divider';
import { Typography } from '@mui/material';

export const AESInfo = () => {
    return (
        <Paper sx={{ width: "auto", margin: 'auto', overflow: 'hidden', pl: 2, textAlign: "left" }}>
            <Typography
                variant='h5'
                sx={{ mt: 2 }}
            >Substitution : Info</Typography>
            <Divider sx={{ mt: 1, mb: 1 }} />
            <Typography variant='h6'>What is AES cipher?</Typography>
            <br></br>
        </Paper>
    )
}
