import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import RefreshIcon from '@mui/icons-material/Refresh';
import { MathComponent } from "mathjax-react";
import Divider from '@mui/material/Divider';
export default function Content() {
    const example = String.raw`\int_{-\infty}^{\infty}e^{-x^2}\ dx`;
    return (
        <Paper sx={{ maxWidth: 936, margin: 'auto', overflow: 'hidden', pl: 2 }}>
            <h2>RSA</h2>
            <Divider sx={{ mt: 2 }} />

            <p style={{ textAlign: "left" }}>
                {" "}
                It is hard to compute <MathComponent
                    tex={example}
                    display={false}
                />{" "}
                if you don't know much math.
            </p>

        </Paper>
    );
}