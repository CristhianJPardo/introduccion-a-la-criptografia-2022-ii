import * as React from 'react';
import Paper from '@mui/material/Paper';
import { MathComponent } from "mathjax-react";
import Divider from '@mui/material/Divider';
import { Typography } from '@mui/material';

export const ShiftInfo = (props) => {

    const tex1 = String.raw`\ \mathcal{P}=\mathcal{C}=\mathbb{Z}_n`;
    const tex2 = String.raw`\ n`;
    const tex3 = String.raw`\ K \in \mathbb{ Z } _n`;
    const tex4 = String.raw`\ e_k(x) \equiv x + K \pmod n `;
    const tex5 = String.raw`\ d_k(y) \equiv y - K \pmod n `;
    const tex6 = String.raw`\ d_k(e_k(x)) \equiv d_k(x + K) \equiv(x + K) - K \equiv x \pmod n`;
    {/* <p style={{ textAlign: "left" }}>
                It's a generalization of Caesar Cipher, in this case:
                <MathComponent tex={tex1} display={false} />
                <MathComponent tex={tex2} display={false} /> fixed.
                <br />
                For <MathComponent tex={tex3} display={false} />, It holds thath:
                <br />
                <MathComponent tex={tex4} display={false} />, and
                <br />
                <MathComponent tex={tex5} display={false} />, so:
                <br />
                <MathComponent tex={tex6} display={false} />.



            </p> */}


    return (

        <Paper sx={{ maxWidth: 936, margin: 'auto', overflow: 'hidden', pl: 2, textAlign: "left" }}>
            <Typography
                variant='h5'
                sx={{ mt: 2 }}
            >Shift : Info</Typography>
            <Divider sx={{ mt: 1, mb: 1 }} />
            Acá va la info de Shift

        </Paper>

    )
}
