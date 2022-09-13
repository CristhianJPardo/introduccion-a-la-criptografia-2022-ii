import * as React from 'react';
import Paper from '@mui/material/Paper';
// import { MathComponent } from "mathjax-react";
import Divider from '@mui/material/Divider';
import { Typography } from '@mui/material';
import { MathComponent } from "mathjax-react";

export const VigenereInfo = () => {

    const tex1 = String.raw` A `;
    const tex2 = String.raw` E `;
    const tex3 = String.raw` S `;
    const tex4 = String.raw` W `;

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
            >Vigenere : Info</Typography>
            <Divider sx={{ mt: 1, mb: 1 }} />
            <Typography variant="h6" gutterBottom>
                What is a Vigenère cipher?
            </Typography>
            <Typography>

                The Vigenère cipher is a polyalphabetic substitution cipher that is a natural evolution of the Caesar cipher. The Caesar cipher encrypts by shifting each letter in the plaintext up or down a certain number of places in the alphabet. If the message was right shifted by 4, each
                <MathComponent tex={tex1} display={false} />
                would become
                <MathComponent tex={tex2} display={false} />
                , and each
                <MathComponent tex={tex3} display={false} />
                would become
                <MathComponent tex={tex4} display={false} />,
            </Typography>
            <br></br>
            <Typography variant="h6" gutterBottom>
                How to encrypt using Vigenère cipher?
            </Typography>

            <Typography>
                In order to cipher a text, take the first letter of the message and the first letter of the key, add their value (letters have a value depending on their rank in the alphabet, starting with 0). The result of the addition modulo 26. Continue with the next letter of the plaintext, and the next letter of the key. When arrived at the end of the key, go back to the first letter of the key.
            </Typography>
            <br></br>
            <Typography variant="h6" gutterBottom>
                How to decrypt using the Vigenère cipher?
            </Typography>
            <Typography>
                Vigenere decryption requires a key (and an alphabet). As for encryption, two ways are possible. To decrypt, take the first letter of the ciphertext and the first letter of the key, and subtract their value (letters have a value equal to their position in the alphabet starting from 0). If the result is negative, add 26 (with 26 the alphabet size), the result gives the rank of the plain letter. Continue with the next letters of the message and the next letters of the key, when arrived at the end of the key, go back the the first key of the key.
            </Typography>
            <br></br>
        </Paper>

    )
}
