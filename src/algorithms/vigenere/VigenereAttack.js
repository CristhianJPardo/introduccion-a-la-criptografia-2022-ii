import * as React from 'react';
import Paper from '@mui/material/Paper';
import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import IconButton from '@mui/material/IconButton';
import { Grid, Typography } from '@mui/material';
import { D_Vigenere } from './Vigenerefunctions';

export const VigenereAttack = () => {
  const initialClearText = ""
  const [clearText, setClearText] = React.useState(initialClearText)
  const initialParamsFixed = false
  const [paramsFixed,] = React.useState(initialParamsFixed)
  const initialKeyWord = ""
  const [keyWord, setKeyWord] = React.useState(initialKeyWord)
  const initialDecryptedText = ""
  const [decryptedText, setDecryptedText] = React.useState(initialDecryptedText)

  const changeKeyWord = (text) => {
    let keyWord = vigenereCryptoAnalysis(text)
    let decryptedText = D_Vigenere(text, keyWord)
    setKeyWord(keyWord.toUpperCase())
    if (keyWord !== "")
      setDecryptedText(decryptedText.toUpperCase());
    else 
      setDecryptedText(initialDecryptedText);
  }

  const freqT = (text) => {
    /* Returns a frequency table with n-grams, frequency and distances.
    params -> text: string 
    return -> frequencyTable: dict, dictionary of the form { n-gram: [freq, [dist1, dist2,...]] }
    */
    var frequencyTable = {};
    for (let i = 0; i < text.length; i++) {
      // monograms
      var subStr1 = text.charAt(i);
      if (subStr1 in frequencyTable) {
        frequencyTable[subStr1][0] += 1;
        frequencyTable[subStr1][1].push(i);
      } else
        frequencyTable[subStr1] = [1, [i]];
      // 2-grams
      if (i < text.length - 1) {
        var subStr2 = text.substring(i, i + 2);
        if (subStr2 in frequencyTable) {
          frequencyTable[subStr2][0] += 1;
          frequencyTable[subStr2][1].push(i);
        } else
          frequencyTable[subStr2] = [1, [i]];
      }
      // 3-grams
      if (i < text.length - 2) {
        var subStr3 = text.substring(i, i + 3);
        if (subStr3 in frequencyTable) {
          frequencyTable[subStr3][0] += 1;
          frequencyTable[subStr3][1].push(i);
        } else
          frequencyTable[subStr3] = [1, [i]];
      }
      // 4-grams
      if (i < text.length - 3) {
        var subStr4 = text.substring(i, i + 4);
        if (subStr4 in frequencyTable) {
          frequencyTable[subStr4][0] += 1;
          frequencyTable[subStr4][1].push(i);
        } else
          frequencyTable[subStr4] = [1, [i]];
      }
    }
    return frequencyTable;
  }

  const kasiskiTest = (text) => {
    /* Give a list of the possible key lengths
    param -> text: string
    return -> possibleKeyLen: list 
    */
    var frequencyTable = freqT(text);
    // get frequency table with n-grams and its corresponding positions
    for (var key in frequencyTable)
      if (((key.length > 1) && (frequencyTable[key][0] === 1)) || (key.length <= 2))
        delete frequencyTable[key];

    var dist = [];
    for (var key_ in frequencyTable)
      for (var i = 1; i < frequencyTable[key_][1].length; i++)
        dist.push(frequencyTable[key_][1][i] - frequencyTable[key_][1][i - 1]);

    let distances = [...new Set(dist)]

    var factors = new Array(15).fill(0); // keySizes
    for (i = 2; i < factors.length + 2; i++) {
      for (var j = 0; j < distances.length; j++) {
        if (distances[j] % i === 0)
          factors[i - 2]++;
      }
    }
    var possibleKeyLen = [];
    for (i = 0; i < 5; i++) {
      var max = Math.max.apply(null, factors);
      var index = factors.indexOf(max);
      possibleKeyLen.push(index + 2);
      factors[index] = 0;
    }
    return possibleKeyLen;
  }

  const lettersFreq = (text) => {
    var frequencyTable = freqT(text + "ABCDEFGHIJKLMNOPQRSTUVWXYZ");
    var orderedFreqT = Object.keys(frequencyTable).sort().reduce((obj, key) => { obj[key] = frequencyTable[key]; return obj; }, {});
    var oneLetterFreq = [];
    for (var key in orderedFreqT)
      if (key.length === 1)
        oneLetterFreq.push(orderedFreqT[key][0] - 1);
    return oneLetterFreq
  }

  const divideText = (text, m) => {
    var dividedText = new Array(m).fill("");
    var i = 0;
    for (var j = 0; j < text.length; j++) {
      if (i % m === 0) i = 0;
      dividedText[i] += text.charAt(j);
      i++;
    }
    return dividedText;
  }

  const IC = (x) => {
    /* Find the probability that two random elements of a string x are identical, i.e, the Index of Coincidence.
    param -> x: string
    return -> iC: int
    */
    var n = x.length;
    var f = lettersFreq(x);
    var iC = 0;
    for (var i = 0; i <= 25; i++)
      iC += (f[i] * (f[i] - 1)) / (n * (n - 1));
    return iC;
  }

  const getAverages = (text, possibleKeyLen) => {
    var average = array => array.reduce((a, b) => a + b) / array.length;
    var averageList = [];
    for (var i = 0; i < possibleKeyLen.length; i++) {
      var dividedText = divideText(text, possibleKeyLen[i]);
      var icList = [];
      for (var j = 0; j < dividedText.length; j++)
        icList.push(IC(dividedText[j]));
      averageList.push(average(icList));
    }
    return averageList;
  }

  const M = (m, n, f) => {
    /* Calculate M_g(y_i) values which help to find the letters of the key based on how close is to 0.065. y_i is given by the list of frequencies f.
    params ->
    m: int, key length
    n: string, string length
    f: list, frequencies of letters in the string
    return -> M: list, M_g(y_i) values
    */
    // probabilities of letters in English
    var p = [.082, .015, .028, .043, .127, .022, .020, .061, .070, .002, .008, .040, .024, .067, .075, .019, .001, .060, .063, .091, .028, .010, .023, .001, .020, .001];
    var n_ = n / m; // length of the string y_i
    var M = new Array(26).fill(0);
    for (var g = 0; g <= 25; g++)
      for (var i = 0; i <= 25; i++)
        M[g] += ((p[i] * f[(i + g) % 26]) / n_);
    return M;
  }

  const findKey = (text, keyLen) => {
    /* Search the key using index of coincidence method, using an estimate of the key length.
    params ->
    text: string 
    keyLen: int
    return -> key: string
    */
    var abc = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    var string = divideText(text, keyLen);
    var keyword = "";
    for (var i = 0; i < keyLen; i++) {
      var freq = lettersFreq(string[i])
      var mValueT = M(keyLen, string[i].length, freq);
      var maxValueIndex = mValueT.indexOf(Math.max.apply(null, mValueT))
      keyword += abc.charAt(maxValueIndex);
    }
    return keyword;
  }

  const vigenereCryptoAnalysis = (cypherText) => {
    /* Returns a key based on a given cyphertext, using Kasiski's method and the index of coincidence method.
    param -> cypherText: string
    return -> key: string 
    */
    var clearCypherText = cypherText.replace(/[^a-zA-Z]/g, "").toUpperCase();
    var possibleKeyLen = kasiskiTest(clearCypherText);
    var avgList = getAverages(clearCypherText, possibleKeyLen);
    var keyIndex = avgList.indexOf(Math.max.apply(null, avgList));
    var keyLen = possibleKeyLen[keyIndex];
    var key = findKey(clearCypherText, keyLen);
    return key;
  }

  return (
    <Paper sx={{
      width: "auto",
      margin: 'auto',
      overflow: 'hidden',
      pl: 2,
      pr: 2,
    }}>
      <Typography
        variant='h5'
        sx={{ mt: 2 }}
      >Vigenere: Attack</Typography>
      <Divider sx={{ mt: 1, mb: 1 }} />
      <Typography variant='h6'>Parameters:</Typography>
      <Box
        sx={{
          display: 'flex',
          flexDirection: "column",
          alignItems: "center",
          p: 2,
          mb: 2,
          ml: 2,
          mt: 2,
        }}
      >
        <TextField
          id="cypher-text"
          label="Enter the text you want to analyze"
          multiline
          helperText="The special characters will be removed, in addition, the letters will be covered to lowercase"
          onChange={e => {
            setClearText(e.target.value);
            changeKeyWord(e.target.value);
          }}
          value={clearText}
          disabled={paramsFixed}
        />
        {/* Debuggeando */}
        {/* {error.toString()}
              <br />
              {nState}
              <br />
              {paramsFixed.toString()}
              <br />
              {nState} */}
        <Box sx={{ mb: 0 }}>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => {
              setKeyWord(initialKeyWord)
              setDecryptedText(initialDecryptedText)
              setClearText(initialClearText)
            }}
          >
            Reset
          </Button>
        </Box>
      </Box>
      <Divider sx={{ mt: 2 }} />
      <Typography variant='h6'>Key:</Typography>
      <Box
        sx={{
          // border: "1px solid red",
          display: 'flex',
          flexDirection: "column",
          alignItems: "center",

        }}
      >
        <Grid container alignItems="center">
          <Box
            sx={{
              width: "60vw",
              bgcolor: "#ccc",
              borderRadius: "8px",
              p: 2,
              mb: 3,
              ml: 5,
              mt: 3,
              height: "auto",
              overflowY: "auto",
            }}
          >
            {keyWord}
          </Box>
          <Tooltip title="Copy to Clipboard">
            <IconButton
              onClick={() => {
                navigator.clipboard.writeText(keyWord)
              }}
            >
              <ContentCopyIcon sx={{ m: 0 }} />
            </IconButton>
          </Tooltip>
          </Grid>
      </Box>
      <Divider sx={{ mt: 2 }} />
      <Typography variant='h6'>Clear Text:</Typography>
      <Box
        sx={{
          display: 'flex',
          flexDirection: "column",
          alignItems: "center",

        }}
      >
        <Grid container alignItems="center">
          <Box
            sx={{
              width: "60vw",
              maxWidth: "65vw",
              bgcolor: "#ccc",
              borderRadius: "8px",
              p: 2,
              mb: 3,
              ml: 5,
              mt: 3,
              height: "auto",
              overflowWrap: 'break-word'
            }}
          >
            {decryptedText}
          </Box>
          <Tooltip title="Copy to Clipboard">
            <IconButton
              onClick={() => {
                navigator.clipboard.writeText(decryptedText)
              }}
            >
              <ContentCopyIcon sx={{ m: 0 }} />
            </IconButton>
          </Tooltip>
        </Grid>

      </Box>
    </Paper>
  )
}
