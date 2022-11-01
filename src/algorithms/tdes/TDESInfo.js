import * as React from 'react';
import Paper from '@mui/material/Paper';
// import { MathComponent } from "mathjax-react";
import Divider from '@mui/material/Divider';
import { Typography } from '@mui/material';

export const TDESInfo = () => {
    return (
        <Paper sx={{ width: "auto", margin: 'auto', overflow: 'hidden', pl: 2, textAlign: "left" }}>
            <Typography
                variant='h5'
                sx={{ mt: 2 }}
            >T-DES : Info</Typography>
            <Divider sx={{ mt: 1, mb: 1 }} />
            <Typography variant='h6'>What is T-DES cipher?</Typography>
            <br></br>
            is a symmetric-key block cipher, which applies the DES cipher algorithm three times to each data block. The Data Encryption Standard's (DES) 56-bit key is no longer considered adequate in the face of modern cryptanalytic techniques and supercomputing power. A CVE released in 2016, CVE-2016-2183 disclosed a major security vulnerability in DES and 3DES encryption algorithms. This CVE, combined with the inadequate key size of DES and 3DES, NIST has deprecated DES and 3DES for new applications in 2017, and for all applications by the end of 2023. It has been replaced with the more secure, more robust AES.
            <br></br>
            While the government and industry standards abbreviate the algorithm's name as TDES (Triple DES) and TDEA (Triple Data Encryption Algorithm), RFC 1851 referred to it as 3DES from the time it first promulgated the idea, and this namesake has since come into wide use by most vendors, users, and cryptographers.
        </Paper>
    )
}
