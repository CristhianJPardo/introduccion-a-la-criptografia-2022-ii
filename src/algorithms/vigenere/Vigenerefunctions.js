const Letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

export function getLetter (n) { // Input: n a integer. Output: the corresponding letter in alphabet
    return Letters[n % 26];
}

const getNumber = (a) => {
    let i = 0;
    let a_up = a.toUpperCase();
    while(a_up !== Letters[i]){
        i++;
    }
    return i;
}

export function str2num (str) {
    let num = [];
    for (let i = 0; i < str.length; i++) {
        num.push(getNumber(str[i]).toString());
    }
    return num; // 2-digits numbers
}

export function D_Vigenere (text, key) {
    text = text.replace(/[^a-zA-Z]/g, '')
    key = key.replace(/[^a-zA-Z]/g, '')
    let m = key.length;
    let key_num = str2num(key);
    let text_num = str2num(text);

    let descifrado = '';

    for (let i = 0; i < text.length; i++) {
        let ind = 26 + parseInt(text_num[i]) - parseInt(key_num[i % m]);
        descifrado += getLetter(ind); 
    }

    return descifrado;
}