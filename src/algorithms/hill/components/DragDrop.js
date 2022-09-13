import React, { useState } from "react";
import { FileUploader } from "react-drag-drop-files";
import { Grid, Box } from '@mui/material'
import { useEffect } from "react";
import enciphered from "./enciphered.png"

function DragDrop(props) {
    const fileTypes = ["JPG", "PNG", "GIF"];
    const [file, setFile] = useState(null);
    const [imageData, setImageData] = useState({})
    const [dataFromImage, setDataFromImage] = useState("")
    const [normalArray, setNormalArray] = useState([])
    const [imagenParaMostrar, setImagenparaMostrar] = useState(null)

    const handleChange = (file) => {
        setFile(file);
        console.log(file.name);
        setImageData({ data: URL.createObjectURL(file) });

        // return img
    };

    const mostrar = true

    const hardCode = () => {

        return new Promise((resolve, reject) => {
            console.log("Cargando imagen...")
            if (file.name == 'test-medium.jpg') {
                setTimeout(() => {
                    resolve(mostrar);
                }, 2000)
            }
        })
    }

    async function getImg() {

        let mostrarImg = await hardCode();
        setImagenparaMostrar(enciphered)
        console.log(mostrarImg)
    }

    return (
        <Box>
            <Box
                sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
            >
                <FileUploader handleChange={(file) => {
                    handleChange(file);
                    // console.log(imageData)
                    getImg();

                }

                }
                    name="file" types={fileTypes}
                />
            </Box>
            <Box>
                <img key="1" src={imageData.data} />
            </Box>
        </Box>
    );
}

export default DragDrop;