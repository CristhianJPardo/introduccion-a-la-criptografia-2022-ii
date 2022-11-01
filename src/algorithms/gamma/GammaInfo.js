import * as React from 'react';
import Paper from '@mui/material/Paper';
// import { MathComponent } from "mathjax-react";
import Divider from '@mui/material/Divider';
import { Typography } from '@mui/material';

export const GammaInfo = () => {
    return (
        <Paper sx={{ width: "auto", margin: 'auto', overflow: 'hidden', pl: 2, textAlign: "left" }}>
            <Typography
                variant='h5'
                sx={{ mt: 2 }}
            >Gamma Pentagonal : Info
            </Typography>
            <Divider sx={{ mt: 1, mb: 1 }} />
            <Typography variant='h6'>Gamma Pentagonal cipher</Typography>
            <br></br>
            <Typography>
                It is an homophonic cipher where each letter gets mapped to several possible number tuples, the assigment follows a count problem that is
                 affected both by a permutation  of possible shifts in the y component and a graph (or quiver) related to a open problem in counting restricted partitions.
            </Typography>
            <br></br>
            <Typography variant="h6" gutterBottom>
                How to encrypt using Afine cipher?
            </Typography>
            <Typography>
               To conceptualize the Gamma Pentagonal is better to think of our key and permutation generating a specific homophonic mapping that gives to every point in a space of the cartesian plane
               a specific letter, for example giving to the tuple (0,0) the character M, to the tuple (0,1) P, and for example to (1,0) the M again, what this represents is that both (0,0) (0,1) are ciphers assigned to the letter M
                which one gets assigned depends on the relative position of the character we are encrypting in the block, whereas which tuples will get an specific character  relates to a problem in number theory.                           </Typography>
            <br></br>
            <Typography variant="h6" gutterBottom>
                How to decrypt using theGgamma pentagonal cipher?
            </Typography>
            <Typography>
                Abstracting the details of how to get the corresponding homophonic permutation we just have to get a table of size kxk where k is the size of the blocks choosen for the algorithm, as such for every tuple
                we can read off which character corresponds to it.
                To get how this block is constructed we need to have a not so long piece of code that we both need to follow on the encryption and decripthion machines, depending on a choosen graph we count directed paths that connect the origin of the graph to a set of points in a certain diagonal (or in more abstract term paths that arrive to a equivalence class)
                            </Typography>
            
        </Paper>
    )
}
