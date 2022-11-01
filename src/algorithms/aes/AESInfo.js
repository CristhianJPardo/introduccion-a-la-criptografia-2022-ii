import * as React from 'react';
import Paper from '@mui/material/Paper';
// import { MathComponent } from "mathjax-react";
import Divider from '@mui/material/Divider';
import { Typography } from '@mui/material';

export const AESInfo = () => {
    return (
        <Paper sx={{ width: "auto", margin: 'auto', overflow: 'hidden', pl: 2, textAlign: "left" }}>
            <Typography
                variant='h5'
                sx={{ mt: 2 }}
            >Advanced Encryption Standard : Info</Typography>
            <Divider sx={{ mt: 1, mb: 1 }} />
            <Typography variant='h6'>What is AES cipher?</Typography>
            <br></br>
            AES is a variant of the Rijndael block cipher developed by two Belgian cryptographers, Joan Daemen and Vincent Rijmen, who submitted a proposal to NIST during the AES selection process. Rijndael is a family of ciphers with different key and block sizes. For AES, NIST selected three members of the Rijndael family, each with a block size of 128 bits, but three different key lengths: 128, 192 and 256 bits.
            <br></br>
            AES has been adopted by the U.S. government. It supersedes the Data Encryption Standard (DES), which was published in 1977. The algorithm described by AES is a symmetric-key algorithm, meaning the same key is used for both encrypting and decrypting the data.
            <br></br>
            In the United States, AES was announced by the NIST as U.S. FIPS PUB 197 (FIPS 197) on November 26, 2001. This announcement followed a five-year standardization process in which fifteen competing designs were presented and evaluated, before the Rijndael cipher was selected as the most suitable.
        </Paper>
    )
}
