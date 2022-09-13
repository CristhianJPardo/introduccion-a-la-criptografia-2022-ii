import * as React from 'react';
import Paper from '@mui/material/Paper';
// import { MathComponent } from "mathjax-react";
import Divider from '@mui/material/Divider';
import { Typography } from '@mui/material';
import { MathComponent } from "mathjax-react";

export const PermutationInfo = () => {
    const tex1 = String.raw`\ k- `;

    return (

        <Paper sx={{
            width: "auto",
            margin: 'auto',
            overflow: 'hidden',
            pl: 2,
            pr: 2
        }}>
            <Typography
                variant='h5'
                sx={{ mt: 2 }}
            >Shift : Info</Typography>
            <Divider sx={{ mt: 1, mb: 1 }} />
            <Typography variant="h6" gutterBottom>
                What is a Permutation cipher?
            </Typography>
            <Typography>
                In Mathematics, item permutations consist in the list of all possible arrangements and ordering of elements in any order. Permutations should not be confused with combinations (for which the order has no influence) or with arrangements also called partial permutations (

                <MathComponent tex={tex1} display={false} />
                permutations of some elements).

            </Typography>

            <br></br>
        </Paper>

    )
}
