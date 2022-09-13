import * as React from 'react';
import Paper from '@mui/material/Paper';
// import { MathComponent } from "mathjax-react";
import Divider from '@mui/material/Divider';
import { Typography } from '@mui/material';
import { MathComponent } from "mathjax-react";

export const AffineInfo = () => {
    const tex1 = String.raw`\ (ax + b) \mod 26 `;
    const tex2 = String.raw`\ ax+b `;
    const tex3 = String.raw`\ x `;
    const tex4 = String.raw`\ y `;
    const tex5 = String.raw`\ y=ax+b \mod 26 `;
    const tex6 = String.raw`\ a `;
    const tex7 = String.raw`\ b `;
    const tex8 = String.raw`\ x= a^{-1}(y - b) \mod 26 `;
    const tex9 = String.raw`\ a^{-1} `;
    const tex10 = String.raw`\ aa^{-1} = 1 \mod 26 `;

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
            >Affine : Info</Typography>
            <Divider sx={{ mt: 1, mb: 1 }} />
            <Typography variant="h6" gutterBottom>
                What is a Affine cipher?
            </Typography>
            <Typography>

                The affine cipher is a type of monoalphabetic substitution cipher, where each letter in an alphabet is mapped to its numeric equivalent, encrypted using a simple mathematical function, and converted back to a letter. The formula used means that each letter encrypts to one other letter, and back again, meaning the cipher is essentially a standard substitution cipher with a rule governing which letter goes to which. As such, it has the weaknesses of all substitution ciphers. Each letter is enciphered with the function
                <MathComponent tex={tex1} display={false} />
                , where b is the magnitude of the shift.

            </Typography>
            <br></br>
            <Typography variant="h6" gutterBottom>
                How to encrypt using Afine cipher?
            </Typography>
            <Typography>
                Encryption uses a classic alphabet, and two integers, called coefficients or keys
                <MathComponent tex={tex6} display={false} /> and
                <MathComponent tex={tex7} display={false} />, these are the parameters of the affine function
                <MathComponent tex={tex2} display={false} />. For each letter of the alphabet is associated to the value of its position in the alphabet (starting at 0).
            </Typography>
            <Typography>
                For each letter of value
                <MathComponent tex={tex3} display={false} />
                of the plain text, is associated a value
                <MathComponent tex={tex4} display={false} />
                , result of the affine function
                <MathComponent tex={tex5} display={false} />
                (with 26 the alphabet size). Each computed value y corresponds to a letter with the same position in the alphabet, it is the ciphered letter. The Affine ciphertext is the replacement of all the letters by the new ones.
            </Typography>
            <br></br>
            <Typography variant="h6" gutterBottom>
                How to decrypt using the Affine cipher?
            </Typography>
            <Typography>
                Affine decryption requires to know the two keys
                <MathComponent tex={tex6} display={false} />
                and
                <MathComponent tex={tex7} display={false} />
                (the one from encryption) and the used alphabet. Each letter of value y of the message corresponds to a value x, result of the inverse function
                <MathComponent tex={tex8} display={false} /> (with 26 the alphabet size) The value
                <MathComponent tex={tex9} display={false} />
                is an integer such as
                <MathComponent tex={tex10} display={false} />.
            </Typography>
            <br></br>
        </Paper>

    )
}
