export function permutationEncrypt(message, key) {
    /* Encrypt a message with a given key, using permutation cypher
    params ->
    message: string
    key: list, list with the corresponding permutation positions, i.e., key = [pi(1), pi(2), ..., pi(m)], with m the length of the key.
    return -> cypherText: string
    */
    message = message.replace(/[^a-zA-Z]/g, '');
    message = message.toUpperCase();
    let m = key.length;
    let dividedText = [];
    let string = "";
    for(var i=0; i<message.length; i++) {
        string += message.charAt(i);
        if ((i+1) % m === 0) {
            dividedText.push(string);
            string = "";
        }
    }

    let permut = new Array(m).fill("");
    let cypherText = "";
    for (i=0; i<dividedText.length; i++) {
        string = dividedText[i];
        for (var j=0; j<m; j++)
            permut[j] = string.charAt(key[j]-1);
        cypherText += permut.join("");
    }
    return cypherText;
}

export function permutationDecrypt(message, key) {
    message = message.replace(/[^a-zA-Z]/g, '');
    message = message.toUpperCase();
    let m = key.length;
    let permutInv = new Array(m).fill(0);
    // find the inverse permutation of the given key
    for (var i=0; i<key.length; i++)
        permutInv[key[i]-1] = i+1;
    let dText = permutationEncrypt(message, permutInv);
    return dText;
}

let digrams = {
"TH"			:	3.56,
"HE"			:	3.07,
"IN"			:	2.43,
"ER"			:	2.05,
"AN"			:	1.99,
"RE"			:	1.85,
"ON"			:	1.76,
"AT"			:	1.49,
"EN"			:	1.45,
"ND"			:	1.35,
"TI"			:	1.34,
"ES"			:	1.34,
"OR"			:	1.28,
"TE"			:	1.20,
"OF"			:	1.17,
"ED"			:	1.17,
"IS"			:	1.13,
"IT"			:	1.12,
"AL"			:	1.09,
"AR"			:	1.07,
"ST"			:	1.05,
"TO"			:	1.04,
"NT"			:	1.04,
"NG"			:	0.95,
"SE"			:	0.93,
"HA"			:	0.93,
"AS"			:	0.87,
"OU"			:	0.87,
"IO"			:	0.83,
"LE"			:	0.83,
"VE"			:	0.83,
"CO"			:	0.79,
"ME"			:	0.79,
"DE"			:	0.76,
"HI"			:	0.76,
"RI"			:	0.73,
"RO"			:	0.73,
"IC"			:	0.70,
"NE"			:	0.69,
"EA"			:	0.69,
"RA"			:	0.69,
"CE"			:	0.65,
"LI"			:	0.62,
"CH"			:	0.60,
"LL"			:	0.58,
"BE"			:	0.58,
"MA"			:	0.57,
"SI"			:	0.55,
"OM"			:	0.55,
"UR"			:	0.54,
}

function* permute(permutation) {//stack overflow 
  var length = permutation.length,
    c = Array(length).fill(0),
    i = 1, k, p;

  yield permutation.slice();
  while (i < length) {
    if (c[i] < i) {
      k = i % 2 && c[i];
      p = permutation[i];
      permutation[i] = permutation[k];
      permutation[k] = p;
      ++c[i];
      i = 1;
      yield permutation.slice();
    } else {
      c[i] = 0;
      ++i;
    }
  }
}

let range = (size, startAt = 0) => {
  return [...Array(size-1).keys()].map(i => i + startAt);
}

function freqTextCustom(text, monograms = false, normalized = false, withPositions = false, moreThanTreeGrams = false) {
  const normFactor = normalized ? text.length : 1
  var frequencyTable = {};
  for (let i = 0; i < text.length; i++) {
    // monograms
    if (monograms) {
      var subStr1 = text.charAt(i);
      if (subStr1 in frequencyTable) {
        frequencyTable[subStr1][0] += 1;
        frequencyTable[subStr1][0] /= normFactor;
        if (withPositions) frequencyTable[subStr1][1].push(i);
      }
      else
        frequencyTable[subStr1] = [1 / normFactor, [i]];
    }
    // 2-grams
    if (i < text.length - 1) {
      var subStr2 = text.substring(i, i + 2);
      if (subStr2 in frequencyTable) {
        frequencyTable[subStr2][0] += 1;
        frequencyTable[subStr2][0] /= normFactor;
        if (withPositions) frequencyTable[subStr2][1].push(i);
      } else
        frequencyTable[subStr2] = withPositions ? [1 / normFactor, [i]] : [1/normFactor];
    }
    // 3-grams
    if (withPositions && moreThanTreeGrams) {
      if (i < text.length - 2) {
        var subStr3 = text.substring(i, i + 3);
        if (subStr3 in frequencyTable) {
          frequencyTable[subStr3][0] += 1;
          frequencyTable[subStr3][0] /= normFactor;
          frequencyTable[subStr3][1].push(i);
        } else
          frequencyTable[subStr3] = [1 / normFactor, [i]];
      }
      // 4-grams
      if (i < text.length - 3) {
        var subStr4 = text.substring(i, i + 4);
        if (subStr4 in frequencyTable) {
          frequencyTable[subStr4][0] += 1;
          frequencyTable[subStr3][0] /= normFactor;
          frequencyTable[subStr4][1].push(i);
        } else
          frequencyTable[subStr4] = [1 / normFactor, [i]];
      }
    }
  }
  return frequencyTable;
}


export function permutationAttack(message,MAXKEYSIZE = 6) {
  // return the first ten most probable permutations of the text
  // assume the key is at most length 6 
  message = message.replace(/[^a-zA-Z]/g, '');
  message = message.toUpperCase();
  let permutations = []
  for (let i = 2; i <= MAXKEYSIZE; i++) {
    if (message.length % i != 0) {
      console.log("skipped permutation size %d", i)
      continue
    }
      console.log("perm size %d", i)
    for (var permutation of permute(range(i + 1, 1))) {
      let candidate = (permutationEncrypt(message, permutation))
      let freqCand = (freqTextCustom(candidate))
      let score = permutationScore(freqCand)
      permutations.push([candidate,score])
    }
  }
  return permutations.slice(0,10)
}

function permutationScore(freqDict,myDict=null){
  //uses custom get https://stackoverflow.com/a/70304057
  // uses a global myDict for english if none provided
  if(myDict === null) myDict = digrams
  let total = 0
  for(let keyValue of Object.entries(myDict)){
    let freq = freqDict[keyValue[0]] ?? 0
    total += freq*keyValue[1]
  }
  return total 
}
