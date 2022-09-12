import * as React from 'react';
import Paper from '@mui/material/Paper';
import { MathComponent } from "mathjax-react";
import Divider from '@mui/material/Divider';
import { Typography } from '@mui/material';


export const ShiftInfo = () => {

    const tex1 = String.raw`\ \mathcal{P}=\mathcal{C}=\mathbb{Z}_n`;
    const tex2 = String.raw`\ n`;
    const tex3 = String.raw`\ K \in \mathbb{ Z } _n`;
    const tex4 = String.raw`\ e_k(x) \equiv x + K \pmod n `;
    const tex5 = String.raw`\ d_k(y) \equiv y - K \pmod n `;
    const tex6 = String.raw`\ d_k(e_k(x)) \equiv d_k(x + K) \equiv`;
    const tex8 = String.raw`\ (x + K) - K \equiv x \pmod n`
    const tex7 = String.raw`\ n=26`
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
            <Typography>

                It's a generalization of Caesar Cipher, in this case:
                <MathComponent tex={tex1} display={false} />,
                <MathComponent tex={tex2} display={false} /> fixed.
                <br />
                For <MathComponent tex={tex3} display={false} />, It holds thath:
                <br />
                <MathComponent tex={tex4} display={false} />, and
                <br />
                <MathComponent tex={tex5} display={false} />, so:
                <br />
                <MathComponent tex={tex6} display={false} />
                <br />
                <MathComponent tex={tex8} display={false} />.
                <br />
                In the following sections,
                <MathComponent tex={tex7} display={false} />.
            </Typography>

        </Paper>

    )
}
