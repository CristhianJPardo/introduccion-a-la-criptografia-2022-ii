import * as React from 'react';
import Paper from '@mui/material/Paper';
// import { MathComponent } from "mathjax-react";
import Divider from '@mui/material/Divider';
import { Typography } from '@mui/material';

export const ElGamalEccInfo = () => {
    return (
        <Paper sx={{ width: "auto", margin: 'auto', overflow: 'hidden', pl: 2, textAlign: "left" }}>
            <Typography
                variant='h5'
                sx={{ mt: 2 }}
            >ElGamal ECC 25519 : Info</Typography>
            <Divider sx={{ mt: 1, mb: 1 }} />
            <Typography variant='h6'>What is ElGammal ECC 25519 cipher?</Typography>
            <br></br>
            Curve25519 is an elliptic curve used in elliptic-curve cryptography (ECC) offering 128 bits of security (256-bit key size) and designed for use with the elliptic curve Diffie–Hellman (ECDH) key agreement scheme. It is one of the fastest curves in ECC, and is not covered by any known patents. The reference implementation is public domain software.
            <br></br>
            The original Curve25519 paper defined it as a Diffie–Hellman (DH) function. Daniel J. Bernstein has since proposed that the name Curve25519 be used for the underlying curve, and the name X25519 for the DH function.



        </Paper>
    )
}
