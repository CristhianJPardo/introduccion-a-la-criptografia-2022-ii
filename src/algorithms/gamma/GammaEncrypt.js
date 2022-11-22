import * as React from 'react';
import Paper from '@mui/material/Paper';
import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Grid, Typography } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import CasinoIcon from '@mui/icons-material/Casino'
import { TestGrafo } from './TestGrafo';
import { TestPermutacion } from './TestPermutacion';

import { useState } from 'react';

// closure of functions for cipher ?

// function drawGammaGraph(nodes, x0, y0, size) {
//     drawG(nodes, x0, y0, 0, 0, size);
//     window.addEventListener("keydown", checkKeyPressed, false);
//     var i = 0;
//     var j = 0;
//     function checkKeyPressed(e) {
//         if (e.keyCode == "37") {
//             i -= 10;
//         }
//         if (e.keyCode == "38") {
//             j -= 10;
//         }
//         if (e.keyCode == "39") {
//             i += 10;
//         }
//         if (e.keyCode == "40") {
//             j += 10;
//         }
//         context.clearRect(0, 0, canvas.width, canvas.height);
//         drawG(nodes, x0, y0, i, j, size);
//     }
// }
function setLetras(permutation, div = 12, width, height) {
    var letras = [];
    var size = permutation.length;
    var x0 = width / div;
    var y0 = ((div - 1) * height) / div;
    var x = width / div;
    var y = ((div - 1) * height) / div;
    var i = 0;
    var j = 0;
    var fila = [];
    while (j < alphSize && i < size) {
        var arr = [];
        var arr1 = [];
        arr1.push(x - x0, y - y0);
        arr.push(arr1);
        var letra = dict1[(permutation[i] + j) % alphSize];
        arr.push(letra);
        fila.push(arr);
        ++i;
        x += width / size + 15;
        if (i == size) {
            i = 0;
            x = width / div;
            j++;
            y -= height / (alphSize + 2);
            letras.push(fila);
            fila = [];
        }
    }
    return letras;
}

function drawP(permutation, x0 = 0, y0 = 0, context, width, height) {
    // console.log("this is the permu",permutation)
    // permutation = Array.from(permutation.toString()).map(Number)
    console.log("this is the permu", permutation)

    var size = permutation.length;
    var div = 12;
    var letras = setLetras(permutation, div, width, height);
    //lineas del plano
    var colorLineas = "e28743";
    //x
    context.beginPath();
    context.moveTo(width / div - x0, 0);
    context.lineTo(width / div - x0, height);
    context.lineWidth = 1;
    context.strokeStyle = "#" + colorLineas;
    context.stroke();
    //y
    context.beginPath();
    context.moveTo(0, ((div - 1) * height) / div - y0);
    context.lineTo(width, ((div - 1) * height) / div - y0);
    context.lineWidth = 1;
    context.strokeStyle = "#" + colorLineas;
    context.stroke();
    //lineas del plano
    //dibujar coordenadas
    context.beginPath();
    //context.font = "[style] [variant] [weight] [size]/[line height] [font family]";
    var sizeFont = 15; //Tamaño letra
    context.font = sizeFont + "px " + "Consolas, sans-serif";
    var i = 0;
    var j = 0;
    var x = width / div - x0;
    var y = ((div - 1) * height) / div - y0;
    context.moveTo(x, y);
    console.log(letras);

    for (var i = 0; i < alphSize; ++i) {
        for (var j = 0; j < size; ++j) {
            var letra = letras[i][j][1];
            var text = letra + " " + j + "," + i;
            context.fillText(
                text,
                x + letras[i][j][0][0],
                y + letras[i][j][0][1]
            );
        }
    }
    context.stroke();
}
function drawG(nodes, x0, y0, movX, movY, size, context, width, height) {
    var div = 20;
    //lineas del plano
    var colorLineas = "e28743";
    var posx = width / div;
    var posy = ((div - 1) * height) / div;
    var movx = width / div;
    var movy = height / div;
    context.beginPath();
    context.moveTo(posx - movx * x0 - movX, 0);
    context.lineTo(posx - movx * x0 - movX, height);
    context.lineWidth = 2;
    context.strokeStyle = "#" + colorLineas;
    context.stroke();
    //y
    context.beginPath();
    context.moveTo(0, posy + movy * y0 - movY);
    context.lineTo(width, posy + movy * y0 - movY);
    context.lineWidth = 2;
    context.strokeStyle = "#" + colorLineas;
    context.stroke();
    //lineas del plano
    //punto inicial
    context.beginPath();
    context.lineWidth = 1;
    context.strokeStyle = "#ff3232";
    context.fillStyle = "#ff3232";
    context.arc(posx - movX, posy - movY, 3, 0, 2 * Math.PI, true);
    context.fill();
    context.stroke();
    //grid con nodos de coordenada
    for (var i = 0; i < size; ++i) {
        for (var j = 0; j < alphSize; ++j) {
            context.beginPath();
            context.lineWidth = 1;
            context.strokeStyle = "#000000";
            context.fillStyle = "#000000";
            context.arc(
                posx - movx * (x0 - i) - movX,
                posy + movy * (y0 - j) - movY,
                1,
                0,
                2 * Math.PI,
                true
            );
            context.fill();
            context.stroke();
        }
    }
    //dibujo y conexiones de nodos
    for (var i = 0; i < nodes.length; ++i) {
        var node = nodes[i];
        if (i != 0) {
            context.beginPath();
            context.lineWidth = 0.3;
            context.strokeStyle = "#30eaf3";
            context.fillStyle = "#30eaf3";
            context.arc(
                posx - movx * (x0 - node.posX) - movX,
                posy + movy * (y0 - node.posY) - movY,
                2,
                0,
                2 * Math.PI,
                true
            );
            context.fill();
            context.stroke();
        }
        var colorUnion = "009be5";
        for (var j = 0; j < node.nodeOut.length; ++j) {
            var pos2X = nodes[map.get(node.nodeOut[j])].posX;
            var pos2Y = nodes[map.get(node.nodeOut[j])].posY;
            context.beginPath();
            context.moveTo(
                posx - movx * (x0 - node.posX) - movX,
                posy + movy * (y0 - node.posY) - movY
            );
            context.lineTo(
                posx - movx * (x0 - pos2X) - movX,
                posy + movy * (y0 - pos2Y) - movY
            );
            context.lineWidth = 2;
            context.strokeStyle = "#" + colorUnion;
            context.stroke();
        }
    }
}

var rmAccents = function (inputText) {
    var accents = "ÁÄáäÓÖóöÉËéÇçÍÏíïÚÜúüÑñ";
    var noAccents = "AAaaOOooEEeeCcIIiiUUuuNn";
    return inputText
        .split("")
        .map(function (chr) {
            const accentIndex = accents.indexOf(chr);
            return accentIndex !== -1 ? noAccents[accentIndex] : chr;
        })
        .join("");
};

var normalizeInput = function (inputText) {
    return rmAccents(inputText)
        .replaceAll(/[^a-zA-Z]/g, "")
        .replaceAll(" ", "")
        .toLowerCase();
};

function ranPermutation() {
    var size = Math.floor(Math.random() * 26);
    while (size == 0) {
        size = Math.floor(Math.random() * 26);
    }
    var arr = new Array(size);
    for (var i = 0; i < arr.length; i++) arr[i] = i;
    var j;
    var temp;
    for (var i = arr.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
    }
    return arr;
}

function isAValidPermutation(permutation) {
    var dupMap = {};
    for (var i = 0; i < permutation.length; i++) {
        if (
            permutation.length == 0 ||
            permutation[i] < 0 ||
            permutation[i] > permutation.length - 1
        )
            return false;
        // Verificar duplicados.
        if (dupMap[permutation[i]]) return false;
        dupMap[permutation[i]] = true;
    }
    return true;
}
const dict1 = {
    0: "a",
    1: "b",
    2: "c",
    3: "d",
    4: "e",
    5: "f",
    6: "g",
    7: "h",
    8: "i",
    9: "j",
    10: "k",
    11: "l",
    12: "m",
    13: "n",
    14: "o",
    15: "p",
    16: "q",
    17: "r",
    18: "s",
    19: "t",
    20: "u",
    21: "v",
    22: "w",
    23: "x",
    24: "y",
    25: "z",
};
const dict = {
    a: 0,
    b: 1,
    c: 2,
    d: 3,
    e: 4,
    f: 5,
    g: 6,
    h: 7,
    i: 8,
    j: 9,
    k: 10,
    l: 11,
    m: 12,
    n: 13,
    o: 14,
    p: 15,
    q: 16,
    r: 17,
    s: 18,
    t: 19,
    u: 20,
    v: 21,
    w: 22,
    x: 23,
    y: 24,
    z: 25,
};
class Node {
    constructor(posX, posY, generation) {
        this.posX = posX;
        this.posY = posY;
        this.numIn = 0;
        this.maxSlope = 0;
        this.nodeOut = [];
        this.generation = generation;
    }
}

const alphSize = 26;
var nodes = [];
var map = new Map();




function posToId(x0, y0, x, y, length) {
    var len = length;
    if (x0 < 0) {
        len += Math.abs(x0);
    }
    return (y - y0) * len + (x - x0);
}

function gammaGraph(x0, y0, length, graphType) {
    let pos = 0
    nodes = [];
    map = new Map();
    var slopes = [];
    var maxY = 25;
    if (y0 <= 0) maxY += Math.abs(y0);
    if (graphType == 1) {
        //natural numbers
        for (var i = 0; i <= maxY; ++i) {
            slopes.push(i);
        }
        nodes.push(new Node(x0, y0, 1));
        map.set(posToId(x0, y0, x0, y0, length), nodes.length - 1);
        //console.log(map.get(0));
        var i = 0;
        var generation = 1;
        while (true) {
            var x = nodes[i].posX + 1;
            var y = nodes[i].posY + slopes[i];
            if (x < length && y < alphSize) {
                nodes.push(new Node(x, y, generation));
                nodes[i + 1].numIn++;
                nodes[i + 1].maxSlope = slopes[i];
                nodes[i].nodeOut.push(posToId(x0, y0, x, y, length));
                map.set(posToId(x0, y0, x, y, length), nodes.length - 1);
                ++i;
            } else {
                break;
            }
        }
        //                    Generacion 2
        var size = nodes.length;
        //console.log(size);
        generation = 2;
        for (var i = 1; i < size; ++i) {
            var j = 0;
            var index = i;
            while (true) {
                var x = nodes[index].posX + 1;
                var y = nodes[index].posY + slopes[j];
                var id = posToId(x0, y0, x, y, length);
                if (map.get(id) >= 0) {
                    pos = map.get(id);
                } else {
                    pos = -1;
                }
                if (x < length && y < alphSize) {
                    if (pos == -1) {
                        nodes.push(new Node(x, y, generation));
                        pos = nodes.length - 1;
                        map.set(posToId(x0, y0, x, y, length), pos);
                    }
                    var exists = false;
                    for (var k = 0; k < nodes[index].nodeOut.length; ++k) {
                        if (nodes[index].nodeOut[k] == posToId(x0, y0, x, y, length)) {
                            exists = true;
                            break;
                        }
                    }
                    if (!exists) {
                        nodes[pos].numIn++;
                        nodes[pos].maxSlope = Math.max(slopes[j], nodes[pos].maxSlope);
                        nodes[index].nodeOut.push(posToId(x0, y0, x, y, length));
                    }
                    ++j;
                    index = pos;
                } else {
                    break;
                }
            }
        }
        //                    Generacion 3
        generation = 3;
        var maxId =
            (length + Math.abs(Math.min(x0, 0))) *
            (alphSize + Math.abs(Math.min(y0, 0)));
        for (var i = 0; i <= maxId; ++i) {
            if (map.get(i) >= 0) {
                var node = nodes[map.get(i)];
                if (node.generation == 2) {
                    var j = 0;
                    var index = map.get(i);
                    var maxSlope = node.maxSlope;
                    while (slopes[j] <= maxSlope) {
                        var x = nodes[index].posX + 1;
                        var y = nodes[index].posY + slopes[j];
                        var id = posToId(x0, y0, x, y, length);
                        if (map.get(id) >= 0) {
                            pos = map.get(id);
                        } else {
                            pos = -1;
                        }
                        if (x < length && y < alphSize) {
                            if (pos == -1) {
                                nodes.push(new Node(x, y, generation));
                                pos = nodes.length - 1;
                                map.set(posToId(x0, y0, x, y, length), pos);
                                nodes[pos].numIn++;
                            }
                            var exists = false;
                            for (var k = 0; k < nodes[index].nodeOut.length; ++k) {
                                if (nodes[index].nodeOut[k] == posToId(x0, y0, x, y, length)) {
                                    exists = true;
                                    break;
                                }
                            }
                            if (!exists) {
                                nodes[pos].numIn++;
                                nodes[pos].maxSlope = Math.max(slopes[j], nodes[pos].maxSlope);
                                nodes[index].nodeOut.push(posToId(x0, y0, x, y, length));
                            }
                            ++j;
                            index = pos;
                        } else {
                            break;
                        }
                    }
                }
            }
        }
    } else {
        //triangular numbers
        for (var i = 0; (i * (i + 1)) / 2 <= maxY; ++i) {
            slopes.push((i * (i + 1)) / 2);
        }
        nodes.push(new Node(x0, y0, 1));
        map.set(posToId(x0, y0, x0, y0, length), nodes.length - 1);
        //console.log(map.get(0));
        var i = 0;
        //                    Generacion 1
        var generation = 1;
        while (true) {
            var x = nodes[i].posX + 1;
            var y = nodes[i].posY + slopes[i];
            if (x < length && y < alphSize) {
                nodes.push(new Node(x, y, generation));
                nodes[i + 1].numIn++;
                nodes[i + 1].maxSlope = slopes[i];
                nodes[i].nodeOut.push(posToId(x0, y0, x, y, length));
                map.set(posToId(x0, y0, x, y, length), nodes.length - 1);
                ++i;
            } else {
                break;
            }
        }
        //                    Generacion 2
        var size = nodes.length;
        //console.log(size);
        generation = 2;
        for (var i = 1; i < size; ++i) {
            var j = 0;
            var index = i;
            while (true) {
                var x = nodes[index].posX + 1;
                var y = nodes[index].posY + slopes[j];
                var id = posToId(x0, y0, x, y, length);
                if (map.get(id) >= 0) {
                    pos = map.get(id);
                } else {
                    pos = -1;
                }
                if (x < length && y < alphSize) {
                    if (pos == -1) {
                        nodes.push(new Node(x, y, generation));
                        pos = nodes.length - 1;
                        map.set(posToId(x0, y0, x, y, length), pos);
                    }
                    var exists = false;
                    for (var k = 0; k < nodes[index].nodeOut.length; ++k) {
                        if (nodes[index].nodeOut[k] == posToId(x0, y0, x, y, length)) {
                            exists = true;
                            break;
                        }
                    }
                    if (!exists) {
                        nodes[pos].numIn++;
                        nodes[pos].maxSlope = Math.max(slopes[j], nodes[pos].maxSlope);
                        nodes[index].nodeOut.push(posToId(x0, y0, x, y, length));
                    }
                    ++j;
                    index = pos;
                } else {
                    break;
                }
            }
        }
        //                    Generacion 3
        generation = 3;
        var maxId =
            (length + Math.abs(Math.min(x0, 0))) *
            (alphSize + Math.abs(Math.min(y0, 0)));
        for (var i = 0; i <= maxId; ++i) {
            if (map.get(i) >= 0) {
                var node = nodes[map.get(i)];
                if (node.generation == 2) {
                    var j = 1;
                    var index = map.get(i);
                    var maxSlope = node.maxSlope;
                    while (slopes[j] <= maxSlope) {
                        var x = nodes[index].posX + 1;
                        var y = nodes[index].posY + slopes[j];
                        var id = posToId(x0, y0, x, y, length);
                        if (map.get(id) >= 0) {
                            pos = map.get(id);
                        } else {
                            pos = -1;
                        }
                        if (x < length && y < alphSize) {
                            if (pos == -1) {
                                nodes.push(new Node(x, y, generation));
                                pos = nodes.length - 1;
                                map.set(posToId(x0, y0, x, y, length), pos);
                                nodes[pos].numIn++;
                            }
                            var exists = false;
                            for (var k = 0; k < nodes[index].nodeOut.length; ++k) {
                                if (nodes[index].nodeOut[k] == posToId(x0, y0, x, y, length)) {
                                    exists = true;
                                    break;
                                }
                            }
                            if (!exists) {
                                nodes[pos].numIn++;
                                nodes[pos].maxSlope = Math.max(slopes[j], nodes[pos].maxSlope);
                                nodes[index].nodeOut.push(posToId(x0, y0, x, y, length));
                            }
                            ++j;
                            index = pos;
                        } else {
                            break;
                        }
                    }
                }
            }
        }
    }
    return nodes;
}

function calculatePosition(shiftNumber, letter) {
    var res = dict[letter] - shiftNumber;
    res = (res + alphSize) % alphSize;
    return res;
}

function cipher(x0, y0, permutation, clearText, graphType) {
    console.log("parameteres are", typeof (x0), typeof (y0), typeof (permutation), typeof (clearText), typeof (graphType))
    console.log("parameteres are", (x0), (y0), (permutation), (clearText), (graphType))
    if (!isAValidPermutation(permutation)) {
        console.log("WHOOPS");
        return;
    }
    var text = normalizeInput(clearText);
    let size = permutation.length;
    nodes = gammaGraph(x0, y0, size, graphType);
    //console.log(nodes);
    var cipheredText = "";
    var position = 0;
    for (var i = 0; i < text.length; ++i) {
        var y = calculatePosition(permutation[position], text[i]);
        var shift = 0;
        if (map.get(posToId(x0, y0, position, y, size)) >= 0) {
            shift = nodes[map.get(posToId(x0, y0, position, y, size))].numIn;
        }
        cipheredText += "(";
        cipheredText += ((shift + dict[text[i]]) % alphSize) + "," + y;
        cipheredText += ")";
        if (i < text.length - 1) cipheredText += ",";
        ++position;
        position %= size;
    }
    return cipheredText;
}
function decipher(x0, y0, permutation, cipherText, graphType) {
    if (!isAValidPermutation(permutation)) {
        console.log("WHOOPS");
        return;
    }
    let size = permutation.length;
    var clearText = "";
    var position = 0;
    for (var i = 0; i < cipherText.length; ++i) {
        if (cipherText[i] == "(") {
            ++i;
            var a = "";
            while (cipherText[i] != ",") {
                a += cipherText[i];
                ++i;
            }
            ++i;
            var b = "";
            while (cipherText[i] != ")") {
                b += cipherText[i];
                ++i;
            }
            console.log(a, b);
        } else continue;
        var c = parseInt(b);
        nodes = gammaGraph(x0, y0, size, graphType);
        var shift = 0;
        if (map.get(posToId(x0, y0, a, b, size)) >= 0) {
            shift = nodes[map.get(posToId(x0, y0, a, b, size))].numIn;
        }
        clearText += dict1[(c + permutation[position]) % alphSize];
        ++position;
        position %= size;
    }

    return clearText;
}

console.log("TEST TEST")
console.log(cipher(-8, -6, [3, 0, 2, 7, 9, 6, 1, 5, 4, 8], "thealmond", 1));
console.log(
    decipher(
        -8,
        -6,
        [3, 0, 2, 7, 9, 6, 1, 5, 4, 8],
        cipher(-8, -6, [3, 0, 2, 7, 9, 6, 1, 5, 4, 8], "thealmond", 1),
        1
    ))


console.log("TEST TEST")

// closure of functions for cipher ?

const validatePermutation = (input) => { //this one assumes 10 length
    let isNumber = /^-?[1-9]+[0-9]*$/.test(input);
    let key = Array.from(input.toString()).map(Number);
    let expectedKey = Array.from({ length: key.length }, (_, i) => i)
    // console.log(JSON.stringify(key.sort()))
    // console.log(JSON.stringify(expectedKey))
    let validKey = JSON.stringify(key.sort()) === JSON.stringify(expectedKey);
    let validLength = key.length >= 10 && key.length <= 10;
    console.log("an error?", (isNumber && validKey && validLength) == false)
    return (isNumber && validKey && validLength);
}
export const GammaEncrypt = (props) => {
    const [base, setBase] = useState(false)
    const [x, setX] = useState("0")
    const [y, setY] = useState("0")
    const [globalPlainText, setPlain] = useState("attackatdawn")
    const [globalPermu, setPermu] = useState("0123456789")
    const [baseCipherText, setCipher] = useState("")
    const [toUncipher, setToUncipher] = useState("")
    const [graphType, setGraph] = useState(1)
    const [decryptedText, setDecryptedText] = useState("")

    const clear = () => {
        setBase(false);
        setX("");
        setY("");
        setBase(false);

    }

    // const decryptGamma = () => {
    //     setTimeout(
    //         setDecryptedText(""),1000)
    // }

    return (
        <div>
            {/* <Typography sx={{ mb: 2 }}>
                <a href='http://localhost:3001/'>Ir a Gamma Pentagonal!</a>
            </Typography> */}
            {/* <TestGrafo /> */}
            {/* -8 en x -6 y */}
            <Grid>
                <TextField
                    id="param1"
                    label='Enter X'
                    placeholder="0"
                    helperText="Must be an integer"
                    sx={{ width: "300px", mb: 2, ml: 5 }}
                    onChange={e => {
                        // validateAlphabet(e.target.value);
                        if (e.target.value != "") {
                            setX((e.target.value))
                        }
                        else setX(0)
                        // // console.log(a)
                    }}
                    disabled={false}
                    error={false}
                // value={x}
                />
                <TextField
                    id="param2"
                    label='Enter Y'
                    placeholder="0"
                    helperText="Must be an integer"
                    sx={{ width: "300px", mb: 2, ml: 5 }}
                    onChange={e => {
                        if (e.target.value != "") {
                            setY((e.target.value))
                        }
                        else setY(0)
                        // validateAlphabet(e.target.value);
                        // setAlphabet(e.target.value)
                        // // console.log(a)
                    }}
                    disabled={false}
                    error={false}
                // value={"alphabet"}
                />
                <TextField
                    id="param3"
                    label='Enter permutation'
                    placeholder="0123456789"
                    helperText="Must be list of naturals below 10 reordered"
                    sx={{ width: "300px", mb: 2, ml: 5 }}
                    onChange={e => {
                        if (e.target.value != "" && validatePermutation(e.target.value)) {
                            validatePermutation(e.target.value)
                            let cache = Array.from(e.target.value.toString()).map(Number);
                            setPermu(cache)
                        }
                        else {
                            let cache = Array.from(e.target.value.toString()).map(Number);
                            setPermu(cache)
                        }

                        // validateAlphabet(e.target.value);
                        // setAlphabet(e.target.value)
                        console.log(e)
                    }}
                    disabled={false}
                    error={false}
                // value={"alphabet"}
                />
                <TextField
                    id="param4"
                    label='Clear text'
                    placeholder="attackatdawn"
                    helperText="Must be an string"
                    sx={{ width: "300px", mb: 2, ml: 5 }}
                    onChange={e => {
                        if (e.target.value != "") {
                            setPlain(e.target.value);
                        }
                        else setPlain("attackatdawn");





                        // validateAlphabet(e.target.value);
                        // setAlphabet(e.target.value)
                        // // console.log(a)
                    }}
                    disabled={false}
                    error={false}
                // value={"alphabet"}
                />
                <TextField
                    id="param6"
                    label='Enter graph type'
                    placeholder="1"
                    helperText="Must be 1 or 0"
                    sx={{ width: "300px", mb: 2, ml: 5 }}
                    onChange={e => {
                        // validateAlphabet(e.target.value);
                        setGraph(e.target.value)
                    }}
                    disabled={false}
                    error={false}
                />
                <Button
                    variant="contained"
                    color="primary"
                    sx={{ mr: 0.5, ml: 5, mt: 1 }}
                    onClick={() => {
                        // console.log("equal permutations?? ",[3, 0, 2, 7, 9, 6, 1, 5, 4, 8][0]===globalPermu[0])
                        // console.log(typeof([3, 0, 2, 7, 9, 6, 1, 5, 4, 8]))
                        // console.log(typeof(globalPermu))
                        // console.log("parameters are ",x," ", y," ",globalPermu," ",globalPlainText);
                        setCipher(cipher(parseInt(x), parseInt(y), globalPermu, globalPlainText, 1))
                        setBase(true)


                        //seccion grafo

                        var canvas = document.querySelector("#myCanvas");
                        var context = canvas.getContext("2d");
                        var width = canvas.width;
                        var height = canvas.height;
                        context.clearRect(0, 0, canvas.width, canvas.height);


                        if (graphType != "0" || graphType != "1") {
                            setGraph(parseInt(graphType) % 2)
                        }
                        var nodes = gammaGraph(parseInt(x), parseInt(y), globalPermu.length, parseInt(graphType));
                        console.log(nodes);
                        drawG(nodes, x, y, 0, 0, globalPermu.length, context, width, height);

                        // fin seccion grafo
                        // seccion permu

                        setTimeout(
                            () => {
                                var canvas = document.querySelector("#myCanvas2");
                                var context = canvas.getContext("2d");
                                var width = canvas.width;
                                var height = canvas.height;
                                context.clearRect(0, 0, canvas.width, canvas.height);
                                drawP(globalPermu, 0, 0, context, width, height)

                            },
                            100
                        )


                        setTimeout(
                            () => { setBase(true) },
                            100
                        )


                    }}
                    disabled={false}

                >Generate!</Button>

            </Grid>
            {<canvas className='center canvas' id="myCanvas" width="640vw" height="700vh" ></canvas>}
            {<br></br>}
            {<canvas className='center canvas' id="myCanvas2" width="640vw" height="700vh" ></canvas>}
            {<br></br>}
            {
                base ? baseCipherText : ""
            }
            {/* <Button
                variant='contained'
                color='secondary'
                sx={{
                    ml: '50%', mr: '50%'

                }}
                onClick={clear}
            >
                Clear
            </Button> */}
            {/* <Button
                variant='contained'
                color='secondary'
                sx={{
                    ml: '50%', mr: '50%'

                }}
            // onClick={decryptGamma}
            >
                Decrypt
            </Button> */}
        </div>

    )
}