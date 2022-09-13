import * as React from 'react';
import Paper from '@mui/material/Paper';
// import { MathComponent } from "mathjax-react";
import Divider from '@mui/material/Divider';
import { Typography } from '@mui/material';
import img1 from './img1.jpg'
import img2 from './img2.jpg'
export const InitialInfo = () => {
    return (
        <Paper sx={{ maxWidth: 936, margin: 'auto', overflow: 'hidden', pl: 2, pr: 2 }}>
            <Typography
                sx={{ pt: 2 }}
                variant='h5'
            >General info
            </Typography>
            <Divider sx={{ mt: 1, mb: 1 }} />

            <Typography
                sx={{ pt: 2 }}
                variant='h5'
            >Why Madame X?
            </Typography>
            <br></br>
            <Typography>
                Cryptanalyst Agnes Meyer Driscoll (1889-1971) was born on July 24.

                In 1918, she enlisted in the Navy and was assigned to the Codes and Signals section in the Directorate of Naval Communications. He specialized in designing cipher systems and decrypted a large number of Japanese naval systems.

                Until 1949, she worked as a cryptographer for the Navy, where she was known as Madame X.

            </Typography>
            <br></br>
            <Typography
                sx={{ pt: 2 }}
                variant='h5'
            >What is?
            </Typography>

            <Typography>
                Is a website where you can:
                Encrypt and decrypt with some algorithms (Shift, affine, substitution, permutation, hill and vigenere)
                Also you can make attacks to plain texts for each algorithm and find the key.
            </Typography>
            <br></br>
            <img
                className='center'
                src={img1}
                alt='imagen 1'
                style={{
                    width: "500px",
                }}
            />

            <br></br>
            <img
                className='center'
                src={img2}
                alt='imagen 2'
                style={{
                    width: "500px",
                }}
            />

        </Paper>
    )
}
