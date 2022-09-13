import * as React from 'react';
import Paper from '@mui/material/Paper';
import Divider from '@mui/material/Divider';
import { Typography } from '@mui/material';
import DragDrop from './components/DragDrop';
import UploadImages from './components/UploadImages';
import { useState } from 'react';
import { useEffect } from 'react';
import { Box } from '@mui/system';


export const HillDecrypt = () => {

    return (
        <Paper sx={{ width: "auto", margin: 'auto', overflow: 'hidden', pl: 2, textAlign: "left" }}>
            <Typography
                variant='h5'
                sx={{ mt: 2 }}
            >Hill : Decrypt</Typography>
            <Divider sx={{ mt: 1, mb: 1 }} />

            <DragDrop
                sx={{ w: "90%" }}

            />
            {/* <UploadImages /> */}

            <Box
            // sx={{ border: "2px solid red" }}
            >
                { }
            </Box>
        </Paper>
    )
}
