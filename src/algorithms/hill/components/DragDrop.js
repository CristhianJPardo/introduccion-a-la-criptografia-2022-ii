import React, { useState } from "react";
import { FileUploader } from "react-drag-drop-files";
import { Grid, Box } from '@mui/material'
import { useEffect } from "react";

function DragDrop(props) {
    const fileTypes = ["JPG", "PNG", "GIF"];
    const [file, setFile] = useState(null);
    const [imageData, setImageData] = useState({})
    const [dataFromImage, setDataFromImage] = useState("")
    const [normalArray, setNormalArray] = useState([])
    const [height, setHeight] = useState("")
    const [width, setWidth] = useState("")
    const math = require("mathjs");
    // useEffect(() => {
    //     console.log("Está cambiando el componente");
    //     console.log(dataFromImage) // This is be executed when `loading` state changes
    // }, [dataFromImage])
    // // setLoading(true);

    const handleChange = (file) => {
        setFile(file);
        setImageData({ data: URL.createObjectURL(file) });
        // console.log(file);
        // console.log(imageData.data);

        const img = new Image()
        img.src = imageData.data;
        var canvas = document.createElement('canvas');
        var context = canvas.getContext('2d');
        canvas.width = img.width;
        canvas.height = img.height;
        context.drawImage(img, 0, 0, canvas.width, canvas.height)
        let dataFromImage = context.getImageData(0, 0, canvas.width, canvas.height);
        setHeight(dataFromImage.height)
        setWidth(dataFromImage.width)
        props.prop3(dataFromImage.height)
        props.prop4(dataFromImage.width)
        const normalArray = Array.prototype.slice.call(dataFromImage.data);
        setNormalArray(normalArray);
        setDataFromImage(dataFromImage);
        props.prop2(normalArray)
    };

    // const imagen = "lol"

    // const conseguirImagen = () => {

    //     return new Promise((resolve, reject) => {

    //         resolve(dataFromImage)
    //     });
    // }

    // async function resolverConseguirImagen() {
    //     let imagen = await conseguirImagen();
    //     console.log(imagen)
    // }

    const encryptImage = (matrix) => {
        //Un array plano

        if (matrix.length > 1) {
            matrix = props.prop1(matrix, height, width);
            matrix = props.prop2(matrix, math.identity(4))

            // setOutputmatrix(toColor(matrix))
            return props.prop3(matrix)
        }
    }

    const pipeLine = () => {
        console.log("ejecutando pipelin")
        let encryptedArray = encryptImage(normalArray)
        console.log("prueba", encryptedArray)
        props.prop7(encryptedArray)
    }

    return (
        <Box>
            <FileUploader handleChange={(file) => {
                handleChange(file);
                pipeLine()
            }

            }
                name="file" types={fileTypes}
            />

            <img key="1" src={imageData.data} />
            {/* {imageData.data}
            {JSON.stringify(dataFromImage)} */}

        </Box>
    );
}

export default DragDrop;