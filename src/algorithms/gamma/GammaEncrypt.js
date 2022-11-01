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
import grafo from './grafo.png'
import permutacion from './permutacion.png'
import { useState } from 'react';

// closure of functions for cipher ?

    
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
    console.log("parameteres are",typeof(x0), typeof(y0), typeof(permutation), typeof(clearText), typeof(graphType))
    console.log("parameteres are",(x0), (y0), (permutation), (clearText), (graphType))
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
    // setError(isNumber && validKey && validLength);
}
export const GammaEncrypt = (props) => {
    const [base, setBase] = useState(false)
    const [x, setX] = useState("0")
    const [y, setY] = useState("0")
    const [globalPlainText,setPlain] = useState("attackatdown")
    const [globalPermu,setPermu] = useState("0123456789")
    const [baseCipherText,setCipher] = useState("")

    return (
        <div>
            <Typography sx={{ mb: 2 }}>
                <a href='http://localhost:3001/'>Ir a Gamma Pentagonal!</a>
            </Typography>
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
                        setX(e.target.value)
                        // // console.log(a)
                    }}
                    disabled={false}
                    error={false}
                    value={x}
                />
                <TextField
                    id="param2"
                    label='Enter Y'
                    placeholder="0"
                    helperText="Must be an integer"
                    sx={{ width: "300px", mb: 2, ml: 5 }}
                    onChange={e => {
                        setY(e.target.value)
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
                        validatePermutation(e.target.value)
                        let cache = Array.from(e.target.value.toString()).map(Number);
                        setPermu(cache)

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
                    placeholder="attackatdown"
                    helperText="Must be an string"
                    sx={{ width: "300px", mb: 2, ml: 5 }}
                    onChange={e => {
                        setPlain(e.target.value);
                        


                        // validateAlphabet(e.target.value);
                        // setAlphabet(e.target.value)
                        // // console.log(a)
                    }}
                    disabled={false}
                    error={false}
                // value={"alphabet"}
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
                        setCipher(cipher(parseInt(x), parseInt(y), globalPermu,globalPlainText, 1))
                        setBase(false)
                        
                        
                        setTimeout(
                            () => { setBase(true) },
                            2000
                            )

                            
                    }}
                    disabled={false}

                >Generate!</Button>

            </Grid>
            {base ? <img
                className='center'
                src={grafo}
                alt='imagen 1'
                style={{
                    width: "500px",
                }}
            /> : ""}
            {base ? <img
                className='center'
                src={permutacion}
                alt='imagen 1'
                style={{
                    width: "500px",
                }}
            /> : ""}
            {
                base ? baseCipherText : ""
            }
        </div>

    )
}