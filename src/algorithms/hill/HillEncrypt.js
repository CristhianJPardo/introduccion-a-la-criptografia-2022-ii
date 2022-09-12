import * as React from 'react';
import Paper from '@mui/material/Paper';
import Divider from '@mui/material/Divider';
import { Typography } from '@mui/material';
import DragDrop from './components/DragDrop';
import UploadImages from './components/UploadImages';


export const HillEncrypt = () => {
    return (
        <Paper sx={{ width: "auto", margin: 'auto', overflow: 'hidden', pl: 2, textAlign: "left" }}>
            <Typography
                variant='h5'
                sx={{ mt: 2 }}
            >Hill : Encrypt</Typography>
            <Divider sx={{ mt: 1, mb: 1 }} />
            Acá va el Encrypt de Hill
            <DragDrop />
            {/* <UploadImages /> */}

        </Paper>
    )
}