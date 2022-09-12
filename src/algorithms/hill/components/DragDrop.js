import React, { useState } from "react";
import { FileUploader } from "react-drag-drop-files";
import { Grid, Box } from '@mui/material'
function DragDrop() {

    const fileTypes = ["JPG", "PNG", "GIF"];

    const [file, setFile] = useState(null);
    const [imageData, setImageData] = useState({})
    const handleChange = (file) => {
        setFile(file);
        setImageData({ data: URL.createObjectURL(file) });
        console.log(imageData)
    };
    return (
        <Box>
            <FileUploader handleChange={handleChange} name="file" types={fileTypes} />
            <img key="1" src={imageData.data} />
        </Box>
    );
}

export default DragDrop;