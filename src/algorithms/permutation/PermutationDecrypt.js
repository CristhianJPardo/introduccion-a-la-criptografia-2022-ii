import * as React from 'react';
import Paper from '@mui/material/Paper';
import Divider from '@mui/material/Divider';
import { Typography } from '@mui/material';

export const PermutationDecrypt = () => {
    return (
        <Paper sx={{ width: "auto", margin: 'auto', overflow: 'hidden', pl: 2, textAlign: "left" }}>
            <Typography
                variant='h5'
                sx={{ mt: 2 }}
            >Permutation : Decrypt</Typography>
            <Divider sx={{ mt: 1, mb: 1 }} />
            Acá va el Decrypt de Permutation

        </Paper>
    )
}
