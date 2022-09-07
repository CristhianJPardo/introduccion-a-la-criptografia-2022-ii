import * as React from 'react';
import Paper from '@mui/material/Paper';
import { MathComponent } from "mathjax-react";
import Divider from '@mui/material/Divider';
import FormPropsTextFields from './FormPropsTextFields';
import { Typography } from '@mui/material';

export const InitialInfo = () => {
    return (
        <Paper sx={{ maxWidth: 936, margin: 'auto', overflow: 'hidden', pl: 2, pr: 2 }}>
            <Typography
                sx={{ pt: 2 }}
                variant='h5'
            >General info
            </Typography>
            <Divider sx={{ mt: 1, mb: 1 }} />
            Acá va la información general

        </Paper>
    )
}
