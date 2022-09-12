import { Grid, IconButton, Tooltip, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'
import ContentCopyIcon from '@mui/icons-material/ContentCopy';

export const AttackComponents = (props) => {
    return (
        <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
            <Box sx={{ border: '1px solid black', width: 'auto' }}>{props.clave}</Box>
            <Box sx={{ border: '1px solid black' }}>{props.valor}</Box>
        </Box>
    )
}
