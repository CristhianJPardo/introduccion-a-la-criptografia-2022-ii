
import * as React from 'react';
import Paper from '@mui/material/Paper';
import Divider from '@mui/material/Divider';
import { Typography } from '@mui/material';

export const AffineAttack = () => {
    return (
        <Paper sx={{ maxWidth: 936, margin: 'auto', overflow: 'hidden', pl: 2, textAlign: "left" }}>
            <Typography
                variant='h5'
                sx={{ mt: 2 }}
            >Affine : Attack</Typography>
            <Divider sx={{ mt: 1, mb: 1 }} />
            Acá va el ataque a Affine

        </Paper>
    )
}
