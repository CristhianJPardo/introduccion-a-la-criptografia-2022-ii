import * as React from 'react';
import Paper from '@mui/material/Paper';
// import { MathComponent } from "mathjax-react";
import Divider from '@mui/material/Divider';
import { Typography } from '@mui/material';
import { MathComponent } from "mathjax-react";

export const HillInfo = () => {
    const tex1 = String.raw`\ M `;
    const tex2 = String.raw`\ n `;
    const tex3 = String.raw`\ n- `;
    const tex4 = String.raw`\ P `;
    const tex5 = String.raw`\ C = MP \mod 26 `;
    const tex6 = String.raw`\ C `;
    const tex7 = String.raw`\ \{a,b,c,d\} `;
    const tex8 = String.raw`\ ad-bc `;

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
            >Hill : Info</Typography>
            <Divider sx={{ mt: 1, mb: 1 }} />
            <Typography variant="h6" gutterBottom>
                What is a Hill cipher?
            </Typography>
            <Typography>
                Hill Cipher is a polyalphabetic cipher created by extending the Affine cipher, using linear algebra and modular arithmetic via a numeric matrix that serves as an encryption and decryption key.
            </Typography>
            <br></br>
            <Typography variant="h6" gutterBottom>
                How to encrypt using Hill cipher?
            </Typography>
            <Typography>
                Hill cipher encryption uses an alphabet and a square matrix
                <MathComponent tex={tex1} display={false} /> of size
                <MathComponent tex={tex2} display={false} /> made up of integers numbers and called encryption matrix. Split the text into
                <MathComponent tex={tex3} display={false} /> grams. Complete any final incomplete ngrams with random letters if necessary. Substitute the letters of the plain message by a value: their rank in the alphabet starting from 0. or each group of values
                <MathComponent tex={tex4} display={false} /> of the plain text (mathematically equivalent to a vector of size
                <MathComponent tex={tex2} display={false} />), compute the multiplication" matrix product:
                <MathComponent tex={tex5} display={false} /> where <MathComponent tex={tex6} display={false} /> is the calculated vector (a group) of ciphered values and 26 the alphabet length. From cipher values <MathComponent tex={tex6} display={false} />, retrieve cipher letters of the same rank in the alphabet.

            </Typography>

            <br></br>
            <Typography variant="h6" gutterBottom>
                How to decrypt using the Hill cipher?
            </Typography>
            <Typography>
                Hill cipher decryption needs the matrix and the alphabet used. Decryption involves matrix computations such as matrix inversion, and arithmetic calculations such as modular inverse.
            </Typography>
            <Typography>
                To decrypt hill ciphertext, compute the matrix inverse modulo 26 (where 26 is the alphabet length), requiring the matrix to be invertible. Decryption consists in encrypting the ciphertext with the inverse matrix.
            </Typography>
            <Typography>
                Note that not all matrices can be adapted to hill cipher. The determinant of the matrix has to be coprime with 26. For a 2x2 matrix, the 4 numbers
                <MathComponent tex={tex7} display={false} /> must satisfy the condition that
                <MathComponent tex={tex8} display={false} /> is coprime with 26.
            </Typography>
            <br></br>

        </Paper>

    )
}
