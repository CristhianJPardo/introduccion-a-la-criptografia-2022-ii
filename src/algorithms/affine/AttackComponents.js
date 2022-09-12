import { Grid, IconButton, Tooltip, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'
import ContentCopyIcon from '@mui/icons-material/ContentCopy';

export const AttackComponents = (props) => {
    return (
        <Grid container alignItems="center" mb={0}
            sx={{
                border: "1px solid #ccc",
                borderRadius: "8px",
                pb: 0,
                m: 1,
                width: "93%"
            }}
        >

            <Grid item xs>
                <Typography
                    sx={{ mr: 2, textAlign: "right" }}
                >
                    a = {props.a}
                    <br />
                    b = {props.b}
                </Typography>
            </Grid>
            <Grid item xs={8}>
                <Box
                    sx={{
                        // width: "35vw",
                        maxWidth: "40vw",
                        bgcolor: "lightcoral",
                        borderRadius: "8px",
                        p: 2,
                        mb: 3,
                        // ml: 20,
                        mt: 3,
                        mr: 0,
                        height: "auto",
                        // overflowY: "auto",
                        overflowWrap: 'break-word',
                        // border: "1px solid red"
                    }}
                >
                    {props.content}
                </Box>
            </Grid>
            <Grid item xs
                sx={{
                    mr: 0,
                    // border: "1px solid red",
                    // alignItems: "left",
                    // textAlign: "left"
                }}
            >
                <Tooltip
                    title="Copy to Clipboard"

                >
                    <IconButton
                        onClick={() => {
                            navigator.clipboard.writeText(props.content)
                        }}

                    >
                        <ContentCopyIcon />
                    </IconButton>
                </Tooltip>
            </Grid>

        </Grid>
    )
}
