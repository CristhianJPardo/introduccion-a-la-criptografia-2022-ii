import { Grid, Box } from '@mui/material'
import React from 'react'

export const Boxes = (props) => {
    return (

        <Box sx={{ display: 'grid', gridTemplateRows: "1fr 1fr", textAlign: 'center' }}>
            <Box sx={{ border: "1px solid black" }}>
                {props.letraClara}
            </Box>
            <Box sx={{ border: "1px solid black" }}>
                {props.letraCifrada.toUpperCase()}
            </Box>
        </Box>

    )
}
