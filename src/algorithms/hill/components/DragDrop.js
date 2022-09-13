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

    const [mostrar, setMostrar] = useState(false)

    const hardCode = () => {

        return new Promise((resolve, reject) => {
            console.log("Cargando imagen...")

            setTimeout(() => {
                resolve(mostrar);
            }, 5000)

        })
    }

    async function getImg() {
        let mostrarImg = await hardCode();
        setImagenparaMostrar(enciphered)
        setMostrar(true)
        console.log(mostrar)
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
                <img key="1" src={imageData.data} className="center-hill" />
            </Box>
            <Box>
                {mostrar ? <img key="2" src={enciphered} className="center-hill" /> : null}
            </Box>
        </Box>
    );
}

export default DragDrop;