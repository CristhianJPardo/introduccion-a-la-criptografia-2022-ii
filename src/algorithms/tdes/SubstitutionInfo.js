import * as React from 'react';
import Paper from '@mui/material/Paper';
// import { MathComponent } from "mathjax-react";
import Divider from '@mui/material/Divider';
import { Typography } from '@mui/material';

export const SubstitutionInfo = () => {
    return (
        <Paper sx={{ width: "auto", margin: 'auto', overflow: 'hidden', pl: 2, textAlign: "left" }}>
            <Typography
                variant='h5'
                sx={{ mt: 2 }}
            >Substitution : Info</Typography>
            <Divider sx={{ mt: 1, mb: 1 }} />
            <Typography variant='h6'>What is a Substitution cipher?</Typography>
            <br></br>
            <Typography>
                Substitution encryption consists, as its name suggests, of substituting (replacing) one element with another. In the case of a text, it is a question of replacing the characters (often letters) of the message by others.
            </Typography>
            <br></br>
            <Typography variant='h6'>How to encrypt using Subsustitution cipher?</Typography>
            <br></br>
            <Typography>
                For a substitution to be correct, it is necessary for the same element to be substituted by only one other (valid in both cases, for encryption and decryption) so that there is never more than one possibility of encryption or decryption.
            </Typography>
            <br></br>
            <Typography variant='h6'>How to decrypt using the Subsustitution cipher?</Typography>
            <br></br>
            <Typography>
                The condition for a successful substitution decryption is to know the correspondence table used.
            </Typography>
            <br></br>
        </Paper>
    )
}
