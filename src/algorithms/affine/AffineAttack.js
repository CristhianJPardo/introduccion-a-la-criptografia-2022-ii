import * as React from 'react';
import Paper from '@mui/material/Paper';
import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Typography } from '@mui/material';
import { AttackComponents } from './AttackComponents';

export const AffineAttack = () => {


    const keysOfDeciphertexts = [...Array(26).keys()]
    const [clearText, setClearText] = React.useState("")
    const [decryptedTexts, setDecryptedTexts] = React.useState([])
    const Letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const getLetter = (n) => {
        return Letters[n % 26];
    }

    function Count_letters(text) { // Recibe un texto. Retorna una arreglo de arreglos: [ ['a', #1], ['d', #2], ... ]
        text = text.replace(/[^a-zA-Z]/g, '')
        text = text.toUpperCase()
        let count = {}
        // Count with a dictionary
        text.split('').forEach(function (s) {
            count[s] ? count[s]++ : count[s] = 1;
        });
        //console.log(count);
        // Create items array
        var items = Object.keys(count).map(function (key) {
            return [key, count[key]];
        });
        // Sort the array based on the second element
        items.sort(function (first, second) {
            return second[1] - first[1];
        });
        // Create a new array with only the first 5 items
        // var arr_top = items.slice(0, 5);
        // console.log(arr_top);
        return items.slice(0, items.length);
    }

    const str2num = (str) => {
        let num = [];
        for (let i = 0; i < str.length; i++) {
            num.push(getNumber(str[i]).toString());
        }
        return num;
    }

    function D_Afin(text, a, b) { // Asumimos que la clave es como ["m", "d"]    
        text = text.replace(/[^a-zA-Z]/g, '')
        var text_num = str2num(text);
        var decifrado = '';
        const size = text.length;
        var ia = Inv_mod(a);
        for (let i = 0; i < size; i++) {
            var ind = 26 * 26 + parseInt(ia) * (parseInt(text_num[i]) - parseInt(b));
            decifrado += getLetter(ind);
        }
        return decifrado;
    }

    function getNumber(a) { // Recibe una letra. Retorna un número
        let i = 0;
        let a_up = a.toUpperCase();
        while (a_up != Letters[i]) {
            i++;
        }
        return i;
    }

    function gcd(m, n) { // m y n enteros positivos. Retorna entero
        var gcd;
        while (true) {
            gcd = m % n;
            if (gcd == 0) {
                return n;
            }
            m = n;
            n = gcd;
        }
    }

    function Inv_mod(a, m = 26) { // 
        let m0 = m;
        let y = 0;
        let x = 1;
        if (m == 1)
            return 0;
        while (a > 1) {
            // q is quotient
            let q = parseInt(a / m);
            let t = m;
            // m is remainder now,
            // process same as
            // Euclid's algo
            m = a % m;
            a = t;
            t = y;
            // Update y and x
            y = x - q * y;
            x = t;
        }

        // Make x positive
        if (x < 0) {
            x += m0;
        }
        return x;
    }

    function A_Afin(text) {
        text = text.toString()
        text = text.replace(/[^a-zA-Z]/g, '')
        text = text.toUpperCase()
        let size = 26;
        // Probar todas las opciones
        let items = [];
        for (let i = 0; i < size; i++) { // Recorremos las letras
            if (gcd(i, size) == 1) { // a
                for (let j = 0; j < size; j++) { // b    
                    let d = D_Afin(text, i, j);
                    items.push([Count_letters(d), [i, j]])
                }
            }
        }

        // x[casos i,j][0: conteo, 1: i,j][SOLO para conteo: 0: más repetida, 1, ...][0:letra, 1:cantidad]
        let r = [];
        let size2 = text.length
        if (size2 == 1 || size2 == 0) {
            return []
        }
        for (let j = 0; j < items.length; j++) {
            if (items[j][0][0][0] == 'E' && items[j][0][1][0] == 'A') {        // E, A
                r.push([D_Afin(text, items[j][1][0], items[j][1][1]), items[j][1][0], items[j][1][1]]);
            }

            if (items[j][0][0][0] == 'E' && items[j][0][1][0] == 'T') { // E, T
                r.push([D_Afin(text, items[j][1][0], items[j][1][1]), items[j][1][0], items[j][1][1]]);
            }
            if (items[j][0][0][0] == 'T' && items[j][0][1][0] == 'A') { // T, A
                r.push([D_Afin(text, items[j][1][0], items[j][1][1]), items[j][1][0], items[j][1][1]]);
            }
            if (items[j][0][0][0] == 'T' && items[j][0][1][0] == 'E') { // T, E
                r.push([D_Afin(text, items[j][1][0], items[j][1][1]), items[j][1][0], items[j][1][1]]);
            }
            if (items[j][0][0][0] == 'A' && items[j][0][1][0] == 'E') { // A, E
                r.push([D_Afin(text, items[j][1][0], items[j][1][1]), items[j][1][0], items[j][1][1]]);
            }
            if (items[j][0][0][0] == 'A' && items[j][0][1][0] == 'T') { // A, T
                r.push([D_Afin(text, items[j][1][0], items[j][1][1]), items[j][1][0], items[j][1][1]]);
            }
            if (items[j][0][0][0] == 'E' && items[j][0][1][0] == 'O') { // E, O
                r.push([D_Afin(text, items[j][1][0], items[j][1][1]), items[j][1][0], items[j][1][1]]);
            }
            if (items[j][0][0][0] == 'O' && items[j][0][1][0] == 'E') {        // E, A
                r.push([D_Afin(text, items[j][1][0], items[j][1][1]), items[j][1][0], items[j][1][1]]);
            }
        }
        if (r == []) {
            return items
        } else {
            return r
        }
    }


    // const caesarDecipher = (text, n) => {
    //     text = text.replace(/[^a-zA-Z]/g, '')
    //     text = text.toLowerCase()
    //     let decryptedTexts = A_Afin(text)
    //     setDecryptedTexts(decryptedTexts)
    // }

    const listItems = decryptedTexts.map(([texto, a, b], i) => {
        return (
            <AttackComponents
                key={i.toString()}
                a={a.toString()}
                b={b.toString()}
                content={texto.toString()}
            />
        )
    })

    return (

        <Paper sx={{ width: "auto", margin: 'auto', overflow: 'hidden', pl: 2, pr: 2 }}>
            <Typography
                variant='h5'
                sx={{ mt: 2 }}
            >Shift: Attack</Typography>
            <Divider sx={{ mt: 1, mb: 1 }} />
            <Typography variant='h6'
                sx={{ mb: 2 }}
            >Ciphertext:</Typography>
            <Box
                sx={{
                    // border: "1px solid red",
                    display: 'flex',
                    flexDirection: "column",
                    alignItems: "center",
                }}
            >
                <TextField
                    id="clear-text"
                    label="Enter the text you want to decipher"
                    placeholder="BUUBDLBUEPXO"
                    helperText="The special characters will be removed, in addition, the letters will be covered to uppercase"
                    onChange={e => {
                        setClearText(e.target.value);
                        // console.log(e.target.value);
                        setDecryptedTexts(A_Afin(e.target.value))
                    }}
                    value={clearText}
                />
            </Box>
            <Divider sx={{ mt: 2 }} />
            <Typography variant='h6'>Attack Results:</Typography>
            <ul>{listItems}</ul>
            {console.log(decryptedTexts)}
        </Paper>

    )
}
