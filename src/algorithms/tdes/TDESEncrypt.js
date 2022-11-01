
import { Grid, Typography } from '@mui/material';
import { Box, Button } from '@mui/material'
import React, { useState } from 'react'
import axios from 'axios';

export const TDESEncrypt = (props) => {

    const [selectedFile, setSelectedFile] = useState(null)
    const [imageData, setImageData] = useState({})
    const [imageData2, setImageData2] = useState({})
    const [responseImage, setResponseImage] = useState(null)
    const [defaultValue, setDefault] = useState(null)
    const [mode, setMode] = useState('');
    const [key, setKey] = useState('');

    const fileChangeHandler = (e) => {
        setSelectedFile(e.target.files[0]);
        setImageData({ data: URL.createObjectURL(e.target.files[0]) });
        setDefault(imageData.name);
        console.log(e.target.files[0])
    }

    const enviarImagenAEncriptar = async (data) => {
        try {
            const resp = await axios.post(
                "http://localhost:8000/upload_tdes_encrypt/"
                + "?" + (new URLSearchParams({ key: key })).toString()
                + "&" + (new URLSearchParams({ mode: mode })).toString()
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
            2500
        );
        // e.preventDefault(); //Prevenir que se refresque la página cuando se haga submit
    }

    const cancel = () => {
        document.getElementById("forma").reset()
    }
    const clear = () => {
        setSelectedFile(null);
        setImageData({});
        setImageData2({});
        setResponseImage(null);
        cancel()
    }

    const handleModeChange = (e) => {
        // console.log(e.target.value)
        setMode(e.target.value)
    }
    const handleKeyChange = (e) => {
        // console.log(e.target.value)
        setKey(e.target.value)
    }

    return (
        <Box>
            <form id="forma"
            // onSubmit={preventSubmit}
            >
                <Grid sx={{ display: 'grid', justifyContent: 'center', alignContent: 'center', gridTemplateColumns: '1fr  1fr', gap: '4px' }}>
                    <Typography>Mode</Typography>
                    <Typography>Key</Typography>
                </Grid>
                <Grid sx={{ display: 'grid', justifyContent: 'center', alignContent: 'center', gridTemplateColumns: '1fr  1fr', gap: '4px', mb: 1 }}>

                    <select name="MODE"
                        onChange={handleModeChange}
                    >
                        <option value="default"></option>
                        <option value="ECB">ECB</option>
                        <option value="CBC">CBC</option>
                        <option value="OFB">OFB</option>
                        <option value="CFB">CFB</option>
                        <option value="CTR">CTR</option>
                    </select>
                    <select name="Key"
                        onChange={handleKeyChange}
                    >
                        <option value="default"></option>
                        <option value="16">16</option>
                        <option value="24">24</option>
                        {/* <option value="32">32</option> */}
                    </select>
                </Grid>

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
