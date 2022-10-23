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
                What is a AES cipher?
            </Typography>
            <Typography>

            The Advanced Encryption Standard (AES), also known by its original name Rijndael,  is a specification for the encryption of electronic data established by the U.S. National Institute of Standards and Technology (NIST) in 2001.

            AES is based on a design principle known as a substitution–permutation network, and is efficient in both software and hardware. Unlike its predecessor DES, AES does not use a Feistel network. AES is a variant of Rijndael, with a fixed block size of 128 bits, and a key size of 128, 192, or 256 bits. By contrast, Rijndael per se is specified with block and key sizes that may be any multiple of 32 bits, with a minimum of 128 and a maximum of 256 bits. Most AES calculations are done in a particular finite field.

            </Typography>
            <br></br>
            <Typography variant="h6" gutterBottom>
                How to encrypt using AES cipher?
            </Typography>
            <Typography>
            The key size used for an AES cipher specifies the number of transformation rounds that convert the input, called the plaintext, into the final output, called the ciphertext. The number of rounds are as follows:

                10 rounds for 128-bit keys.
                12 rounds for 192-bit keys.
                14 rounds for 256-bit keys.

            Each round consists of several processing steps, including one that depends on the encryption key itself. A set of reverse rounds are applied to transform ciphertext back into the original plaintext using the same encryption key.

            </Typography>
            <br></br>
            <Typography variant="h6" gutterBottom>
                How to decrypt using the AES cipher?
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
