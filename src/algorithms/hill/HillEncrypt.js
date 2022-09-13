import * as React from 'react';
import Paper from '@mui/material/Paper';
import Divider from '@mui/material/Divider';
import { Typography } from '@mui/material';
import DragDrop from './components/DragDrop';
import UploadImages from './components/UploadImages';
import { useState } from 'react';
import { useEffect } from 'react';
import { Box } from '@mui/system';


export const HillEncrypt = () => {

    const [globalImage, setGlobalImage] = useState([])
    const [height, setHeight] = useState("")
    const [width, setWidth] = useState("")
    const [outputMatrix, setOutputmatrix] = useState([])
    //
    const math = require("mathjs");

    //small helped functions
    let modInverse = (a, n) => {

        let cache = math.xgcd(a, n);
        //unpack matrix object
        let gcdresult = cache._data[0], inverse = cache._data[1];
        if (gcdresult != 1) {
            console.log("inverse non found");
            return null
        }
        return (inverse + n) % n // to only return positive numbers 
    }

    let range = (size, startAt = 0) => {
        return [...Array(size).keys()].map(i => i + startAt);
    }

    let factArray = (n) => {

        let factors = []
        for (let candidate = 2; candidate < n; candidate++) {
            if (n % candidate == 0) factors = [...factors, candidate]
        }
        return factors
        //try to improve with fermat algorithm
    }

    let validateMatrix = (matrix, modn = 26) => {
        //depends on function factors
        // to prove that modn wont be needed here

        let det = math.det(math.mod(matrix, modn))
        let factors = factArray(modn)
        if (det % modn == 0) {
            {
                console.error("non valid matrix, zero determinant")
                return null
            }
        }
        //console.log(factors)
        for (let fac of factors) {
            if (det % fac == 0) {
                console.error("non valid matrix,by factor", fac)
                return null
            }
            return det
        }
    }

    let modInverseMatrix = (A, modn = 26) => {
        //depends on validateMatrix, factors and modInverse
        console.log(modn)
        A = math.mod(A, modn)
        let det = validateMatrix(A, modn)
        if (det == null) return null
        // console.log("matrix is ", A)
        // console.log("with det ", det % modn + modn)

        //compute adjoint matrix 
        let inv = math.inv(A)
        let adj = math.multiply(inv, det)
        //round values to get ints
        console.log(adj)
        adj = math.map(adj, (value) => { return math.round(value) })
        console.log(adj)

        let invMod = math.multiply(adj, modInverse(det, modn));
        // to get matrix with only positives 
        invMod = math.map(invMod, (value) => { return ((value % modn) + modn) % modn })

        return invMod

    }

    let hillCipher = (matrixToCipher, hillMatrix, modn) => {
        hillMatrix = math.matrix(hillMatrix)
        let blockSize = hillMatrix.size()[0]
        let myHillMatrix = math.matrix(hillMatrix)
        if (matrixToCipher.size()[1] % blockSize != 0) {
            console.error(matrixToCipher.size()[1], " and  blocksize", blockSize)
            console.error("not enough chars for blocks");
            return null
        }
        let plainCiphers = math.matrix(matrixToCipher)
        plainCiphers = plainCiphers.reshape([-1, blockSize])
        let ciphered = math.multiply(plainCiphers, myHillMatrix)
        ciphered = math.mod(ciphered, modn)
        ciphered = math.squeeze(ciphered)
        return ciphered
    }


    let abcToModn = (string, blockSize = 2) => {
        //asumes asci encoding
        let Aposition = 65,
            Zposition = 90,
            aPosition = 97,
            zPosition = 122;

        let padCharacter = 23  // messageXXX
        let ciphers = []
        let padding = Array(blockSize - (string.length % blockSize)).fill(padCharacter)

        for (let charindex in string) {
            let myInt = string.charCodeAt(charindex)
            if (myInt < Aposition || myInt > zPosition) {
                console.error("non english char")
                return null
            }
            if (myInt > Zposition && myInt < aPosition) {
                console.error("char not in alphabet")
                return null
            }
            //else 32 helps us make 64 and 96 0 index, and lowercase = upper  
            ciphers = ciphers.concat(myInt % 32 - 1)
        }

        return [...ciphers, ...padding]
    }

    function combinations(arr, k) {
        // https://rosettacode.org/wiki/Combinations#JavaScript
        var i,
            subI,
            ret = [],
            sub,
            next;
        for (i = 0; i < arr.length; i++) {
            if (k === 1) {
                ret.push([arr[i]]);
            } else {
                sub = combinations(arr.slice(i + 1, arr.length), k - 1);
                for (subI = 0; subI < sub.length; subI++) {
                    next = sub[subI];
                    next.unshift(arr[i]);
                    ret.push(next);
                }
            }
        }
        return ret;
    }

    //
    //
    // TESTER FUNCTIONS
    let testInverses = (n) => {
        for (var i = 0; i < n; i++) {
            console.log("i has value ", i, "and inverse mod", n, ":", modInverse(i, n))
            console.log("\n")
        }
    }

    let testInversesMatrix = (n, matrix) => {
        const a = matrix
        console.log("For matrix ", a)
        const b = modInverseMatrix(a)
        console.log("found inverse ", b)
    }

    let testMod26Matrices = () => {
        let a = ([[6, 24, 1], [13, 16, 10], [20, 17, 15]])
        testInversesMatrix(26, a)
        a = ([[3, 3], [2, 5]])
        testInversesMatrix(26, a)
    }

    let testPlainCiphering = () => {
        abcToModn("abc")
        abcToModn("ABC")
        abcToModn("ZxY")
        abcToModn("CAESAR")
    }

    let testHillCipher = (str = "helloworld", key = [[3, 3], [2, 5]], modn = 26) => {
        key = math.matrix(key)
        let blocksize = key.size()[0]


        let cipherMatrix = math.matrix(abcToModn(str, blocksize))
        let ciphered = hillCipher(cipherMatrix.reshape([-1, blocksize]), key)
        let unciphered = hillCipher(ciphered, modInverseMatrix(key, modn))
        // 65 to get uppercase again
        let finalmatrix = math.add(math.mod(unciphered, modn), 65)
        let decryption = String.fromCharCode(...(math.flatten(finalmatrix)._data))
        return decryption
    }



    let keyAndInverseSearcher = (plainText, ciphered, blocksize = 3, nmod = 26) => {
        //needs combinations function
        if (plainText.length != ciphered.length) {
            console.error("incorrect cipher plaintext pair")
            return null
        }
        plainText = math.matrix(plainText)
        plainText = plainText.reshape([-1, blocksize])
        ciphered = math.matrix(ciphered)
        ciphered = ciphered.reshape([-1, blocksize])

        let plainTextChoices = combinations(plainText._data, blocksize)
        let cipheredChoices = combinations(ciphered._data, blocksize)
        for (let i = 0; i < cipheredChoices.length; i++) {

            // go trough selections of ciphered and unciphered text
            let slicePlain = plainTextChoices[i]
            let sliceCipher = cipheredChoices[i]

            // console.log(slicePlain)
            // console.log(sliceCipher)
            let aInverse = modInverseMatrix(slicePlain, nmod)
            if (aInverse != null) return math.multiply(aInverse, sliceCipher)

            let bInverse = modInverseMatrix(sliceCipher, nmod)
            if (bInverse != null) {
                // alternative way to find key
                let kinverse = math.multiply(bInverse, slicePlain)
                return modInverseMatrix(kinverse, nmod)
            }
        }
        //else no valid choice found
        console.error("not enought data for cryptoanalysis")

    }

    let myTranspose = (arrayOfArrays) => {
        // tries to emulate the transpose(0,2,1,3)
        // method from numpy without stride optimization
        // probably a good thing to push to the math.js repo
        //https://stackoverflow.com/a/32034565

        const [s1, s2, s3, s4] = math.size(arrayOfArrays)._data

        let out = math.zeros(math.matrix([s1, s3, s2, s4]))
        // console.log("my shapes are %d %d %d %d",s1,s3,s2,s4)

        //permutation is done inside here
        for (let i = 0; i < s1; i++)
            for (let j = 0; j < s2; j++)
                for (let k = 0; k < s3; k++)
                    for (let l = 0; l < s4; l++) {
                        out._data[i][k][j][l] = arrayOfArrays._data[i][j][k][l]
                    }
        return out
    }

    let imgEncryptionNxM = (img, key, n = 2, m = 2,) => {
        //inspiration from https://stackoverflow.com/a/66644615
        //uses myTranspose
        console.log(img)

        let a_height = math.size(img)._data[0]
        let a_width = math.size(img)._data[1]
        // let a_width = img.size()[1]
        console.log(a_height, a_width)
        if (a_height % n != 0 || a_width % m != 0 || (n * m) % math.matrix(key)._size[0] * math.matrix(key)._size[1]) {
            // had this before || (n * m) % math.matrix(key)._size[0] !=0 but
            // dont remember why
            console.error("incorrect size of window")
            return null
        }
        let window_height = n // must evenly divide a_height
        let window_width = m  // must evenly divide a_width

        let b_height = a_height / window_height
        let b_width = a_width / window_width

        let dimensions1 = [b_height, window_height, b_width, window_width]
        let b = img.reshape(dimensions1)

        // for(el of b._data) console.log(el)
        b = myTranspose(b)
        let dimensions2 = math.size(b)
        //ENCRYPTION
        b = math.flatten(b).reshape([-1, n * m])
        b = hillCipher(b, key, 256)

        //restoring matrix
        b = b.reshape(dimensions2._data)
        b = myTranspose(b)
        let a = b.reshape([a_height, a_width])
        return a
    }
    function blackAndWhite(array, height, width) {
        array = math.matrix(array)

        let rgb = array.reshape([-1, 4])
        rgb = math.resize(rgb, [rgb._size[0], 3])
        let bw = math.mean(rgb, 1)
        return bw.reshape([height, width])

    }

    //

    useEffect(() => {
        console.log("Está cambiando el componente");
        console.log(outputMatrix) // This is be executed when `loading` state changes
    }, [outputMatrix])
    // setLoading(true);


    const encryptImage = (matrix) => {
        //Un array plano

        if (matrix.length > 1) {
            matrix = blackAndWhite(matrix, height, width);
            matrix = imgEncryptionNxM(matrix, math.identity(4))
            // setOutputmatrix(toColor(matrix))
            return toColor(matrix)
        }
    }

    function toColor(array) {
        // gets an array of arrays 
        // or equivalent math.matrix
        // returns a flatten [r,g,b,a,r,g,b,a]
        array = math.matrix(array)
        let allBw = array.reshape([-1, 1])
        let rgb = math.multiply(allBw, [[1, 1, 1]])
        console.log(rgb)
        let rgba = math.resize(rgb, [rgb._size[0], 4], 255)
        rgba = math.flatten(rgba)
        return Uint8ClampedArray.from(rgba._data)
    }

    const handleCanvas = (outputMatrix) => {
        console.log("arreglo", outputMatrix)
        console.log("length", outputMatrix.length)
        if (outputMatrix.length > 0) {

            console.log("toColor", outputMatrix)
            encryptImage(globalImage);
            // let canvas = document.getElementById("canvas2");
            var canvas = document.createElement('canvas');
            console.log("canvas \n", canvas)
            var context = canvas.getContext('2d');
            //
            let img = new ImageData(outputMatrix, 1000);
            let ibm = createImageBitmap(img);
            context.DrawImage(ibm, 0, 0)
        }
    }

    return (
        <Paper sx={{ width: "auto", margin: 'auto', overflow: 'hidden', pl: 2, textAlign: "left" }}>
            <Typography
                variant='h5'
                sx={{ mt: 2 }}
            >Hill : Encrypt</Typography>
            <Divider sx={{ mt: 1, mb: 1 }} />

            <DragDrop
                prop1={blackAndWhite}
                prop2={imgEncryptionNxM}
                prop3={toColor}
                prop7={handleCanvas}
                sx={{ w: "90%" }}

            />
            {/* <UploadImages /> */}

            <Box
                sx={{ border: "2px solid red" }}
            >
                {handleCanvas(outputMatrix)}
            </Box>
        </Paper>
    )
}
