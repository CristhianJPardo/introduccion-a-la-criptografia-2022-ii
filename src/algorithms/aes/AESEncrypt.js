// import * as React from 'react';
// import Paper from '@mui/material/Paper';
// import Divider from '@mui/material/Divider';
// import Box from '@mui/material/Box';
// import TextField from '@mui/material/TextField';
import { Grid, Typography } from '@mui/material';
// import ContentCopyIcon from '@mui/icons-material/ContentCopy';
// import Tooltip from '@mui/material/Tooltip';
// import IconButton from '@mui/material/IconButton';
import { Box, Button } from '@mui/material'
import React, { useState } from 'react'
import { FileUploader } from "react-drag-drop-files";
import axios from 'axios';
import { grid } from '@mui/system';

export const AESEncrypt = (props) => {

    const [selectedFile, setSelectedFile] = useState(null)
    const [imageData, setImageData] = useState({})
    const [imageData2, setImageData2] = useState({})
    const [responseImage, setResponseImage] = useState(null)


    const fileChangeHandler = (e) => {
        setSelectedFile(e.target.files[0]);
        setImageData({ data: URL.createObjectURL(e.target.files[0]) });
        console.log(e.target.files[0])
    }

    const enviarImagenAEncriptar = async (data) => {
        try {
            const resp = await axios.post(
                "http://localhost:8000/upload_aes_encrypt/"
                + "?" + (new URLSearchParams({ key: 24 }))
                , data
            );
            const imageBytes = resp.data
            setResponseImage(imageBytes)
            console.log(resp)

        } catch (err) {
            console.error(err)
        }
    }


    const handleSubmit = (e) => {
        const formData = new FormData();
        formData.append(
            "file",
            selectedFile,
            selectedFile.name
        );
        enviarImagenAEncriptar(formData);
        e.preventDefault(); //Prevenir que se refresque la página cuando se haga submit
    }
    const handleSubmit2 = (e) => {
        setTimeout(
            () => { setImageData2(imageData) },
            1000
        );
        e.preventDefault(); //Prevenir que se refresque la página cuando se haga submit
    }
    const clear = () => {
        setSelectedFile(null);
        setImageData({});
        setImageData2({});
        setResponseImage(null)
    }

    return (
        <Box>
            <form
            // onSubmit={preventSubmit}
            >
                <fieldset>
                    <input
                        name='image'
                        type='file'
                        accept='*'
                        onChange={fileChangeHandler}
                    ></input>
                </fieldset>
                <Grid sx={{ display: 'grid', justifyContent: 'center', alignContent: 'center', gridTemplateColumns: '1fr 1fr 1fr', gap: '4px' }}>
                    <img key="1" src={imageData.data} className="center-hill" />
                    {responseImage ? <img key="2" src={`data:image/png;base64, ${responseImage}`} className="center-hill" /> : null}

                    <img key="3" src={imageData2.data} className="center-hill" />
                </Grid>

                <Grid sx={{ display: 'grid', gap: '4px', gridTemplateAreas: "'. b1 c1 b2 .'" }}>
                    <Button variant='contained'
                        sx={{ gridArea: 'b1' }}
                        onClick={handleSubmit}
                    >
                        Encrypt
                    </Button>
                    <Button variant='contained'
                        sx={{ gridArea: 'b2' }}
                        onClick={handleSubmit2}
                    >
                        Decrypt
                    </Button>
                    <Button variant='contained' color='secondary'
                        sx={{ gridArea: 'c1' }}
                        onClick={clear}
                    >
                        Clear
                    </Button>
                </Grid>
            </form>
        </Box>
    )
}
