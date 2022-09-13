import * as React from 'react';
import Paper from '@mui/material/Paper';
import { MathComponent } from "mathjax-react";
import Divider from '@mui/material/Divider';
import { Typography } from '@mui/material';

export const ShiftInfo = () => {

    const tex2 = String.raw`\ n `;
    const tex3 = String.raw`\ x `;
    const tex4 = String.raw`\ n+x \mod 26 `;
    const tex5 = String.raw`\ E `;
    const tex6 = String.raw`\ H `;
    const tex7 = String.raw`\ Z `;
    const tex8 = String.raw`\ A `;
    const tex9 = String.raw`\ -x `;
    const tex10 = String.raw`\ n-x `;
    const tex11 = String.raw`\ TIJGU `;
    const tex12 = String.raw`\ SHIFT `;

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
            <Typography variant="h6" gutterBottom>
                What is a Shift cipher?
            </Typography>
            <Typography>
                A shift cipher is a substitution cipher, the principle of which is to shift the letters by one or more values in the alphabet. For example the letter B shifted by 1 place in the alphabet becomes C. The Caesar cipher is a shift cipher, usually presented with a shift key of value 3.
            </Typography>
            <Typography>
                The shift cipher encryption uses an alphabet and a key (made up of one or more values) that shifts the position of its letters.
            </Typography>
            <Typography>
                A letter in position
                <MathComponent tex={tex2} display={false} />
                in the alphabet, can be shifted by
                <MathComponent tex={tex3} display={false} />
                into the letter located at position
                <MathComponent tex={tex4} display={false} />
                (with 26 the alphabet size).
            </Typography>
            <Typography>
                Example: Take the letter
                <MathComponent tex={tex5} display={false} />
                in position 5 in the english alphabet, it will be encrypted by a shift of 3 in position 8 or
                <MathComponent tex={tex6} display={false} />.
            </Typography>
            <Typography>
                Example:
                <MathComponent tex={tex7} display={false} />
                shifted by 1 gives
                <MathComponent tex={tex8} display={false} />
                .
            </Typography>

            <br></br>
            <Typography variant="h6" gutterBottom>
                How to encrypt using Shift cipher?
            </Typography>
            <Typography>
                The shift cipher encryption uses an alphabet and a key (made up of one or more values) that shifts the position of its letters.
            </Typography>
            <Typography>
                A letter in position
                <MathComponent tex={tex2} display={false} />
                in the alphabet, can be shifted by
                <MathComponent tex={tex3} display={false} />
                into the letter located at position
                <MathComponent tex={tex4} display={false} />
                (with 26 the alphabet size).
            </Typography>
            <Typography>
                Example: Take the letter
                <MathComponent tex={tex5} display={false} />
                in position 5 in the english alphabet, it will be encrypted by a shift of 3 in position 8 or
                <MathComponent tex={tex6} display={false} />.
            </Typography>
            <Typography>
                Example:
                <MathComponent tex={tex7} display={false} />
                shifted by 1 gives
                <MathComponent tex={tex8} display={false} />.
            </Typography>



            <br></br>
            <Typography variant="h6" gutterBottom>
                How to decrypt using the Shift cipher?
            </Typography>
            <Typography>
                Decryption requires knowing the shift used and the alphabet.Take a letter in position
                <MathComponent tex={tex2} display={false} />
                in the alphabet that has been encrypted by a shift of
                <MathComponent tex={tex3} display={false} />
                , it must be shifted by
                <MathComponent tex={tex9} display={false} />
                to return to its original position
                <MathComponent tex={tex10} display={false} />.
            </Typography>
            <Typography>
                Example: The letter
                <MathComponent tex={tex6} display={false} />
                in position 8 in the english alphabet, will be decrypted from a shift of 3 in position 8-3=5 original
                <MathComponent tex={tex5} display={false} />.
            </Typography>
            <Typography>
                Example: The word
                <MathComponent tex={tex11} display={false} />
                is decoded with an offset of 1 as
                <MathComponent tex={tex12} display={false} />
            </Typography>
            <br></br>
        </Paper>

    )
}
