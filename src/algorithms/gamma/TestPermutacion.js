import React from 'react'

export const TestPermutacion = () => {
    var canvas = document.querySelector("#myCanvas2");
    var context = canvas.getContext("2d");
    var width = canvas.width;
    var height = canvas.height;
    /////////////////////////////////
    /*
    // first shape
    context.beginPath();
    context.moveTo(160, 130);
    context.lineTo(75, 200);
    context.lineTo(150, 275);
    context.lineTo(250, 230);
    context.closePath();
    context.lineWidth = 5;
    context.strokeStyle = "#333";
    context.fillStyle = "#FFCC00";
    context.fill();
    context.stroke();
    // second shape
    context.beginPath();
    context.moveTo(50, 50);
    context.lineTo(450, 300);
    context.closePath();
    context.lineWidth = 45;
    context.strokeStyle = "steelblue";
    context.stroke();
    */

    /**/
    /////////////////////////////////////////////////////////////////////////////////////
    // DELETE DELETE
    const alphSize = 26;
    var nodes = [];
    var map = new Map();

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
    function gammaGraph(x0, y0, length, graphType) {
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
        } else {
            //triangular numbers
            for (var i = 0; (i * (i + 1)) / 2 <= maxY; ++i) {
                slopes.push((i * (i + 1)) / 2);
            }
        }
        //
        //console.log(slopes);
        //                    Generacion 1
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
                let pos = 0
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
                        let pos = 0
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
                                if (
                                    nodes[index].nodeOut[k] == posToId(x0, y0, x, y, length)
                                ) {
                                    exists = true;
                                    break;
                                }
                            }
                            if (!exists) {
                                nodes[pos].numIn++;
                                nodes[pos].maxSlope = Math.max(
                                    slopes[j],
                                    nodes[pos].maxSlope
                                );
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
        return nodes;
    }
    function posToId(x0, y0, x, y, length) {
        var len = length;
        if (x0 < 0) {
            len += Math.abs(x0);
        }
        return (y - y0) * len + (x - x0);
    }
    // DELETE DELETE
    /////////////////////////////////////////////////////////////////////////////////////
    function drawGammaGraph() { }

    function setLetras(permutation, div = 12) {
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
    function drawP(permutation, x0 = 0, y0 = 0) {
        var size = permutation.length;
        var div = 12;
        var letras = setLetras(permutation, div);
        //lineas del plano
        var colorLineas = "92e326";
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
        context.font = sizeFont + "px " + "Times New Roman, sans-serif";
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
    function drawPermutation(permutation) {
        if (permutation.length > 0 && permutation.length <= alphSize) {
            drawP(permutation, 0, 0);
            window.addEventListener("keydown", checkKeyPressed, false);
            var i = 0;
            var j = 0;
            function checkKeyPressed(e) {
                if (e.keyCode == "37") {
                    i -= 10;
                }
                if (e.keyCode == "38") {
                    j -= 10;
                }
                if (e.keyCode == "39") {
                    i += 10;
                }
                if (e.keyCode == "40") {
                    j += 10;
                }
                context.clearRect(0, 0, canvas.width, canvas.height);
                drawP(permutation, i, j);
            }
        }
    }
    //tests
    drawPermutation([3, 0, 2, 7, 9, 6, 1, 5, 4, 8]);
    return (
        <div>
            {/* TestPermutacion */}
        </div>
    )
}
