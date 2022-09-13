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
            <Typography variant="h6" gutterBottom>
                How to encrypt using Permutation cipher?
            </Typography>
            <br></br>
            <Typography>
                Choose a keyword, and split the plaintext into blocks that are the same length as the keyword. We write this in columns beneath the keyword. We then label each keyword letter in alphabetical order (if there are duplicates we take them in order of appearance). So far this is identical to Columnar Transposition. Now we reorder the columns, so that the numbers are in order (the letters of the keyword are in alphabetical order). We now read across the rows.
            </Typography>
            <br></br>
            <Typography variant="h6" gutterBottom>
                How to decrypt using Permutation cipher?
            </Typography>
            <br></br>
            <Typography>
                To decrypt a ciphertext encoded with the Permutation Cipher, we have to write out the ciphertext in columns (the same number as the length of the keyword). We then order the keyword alphabetically, and write the ordered keyword at the top of the columns. We then rearrange the columns to reform the keyword, and read of the plaintext in rows.
            </Typography>
            <br></br>
        </Paper>

    )
}
