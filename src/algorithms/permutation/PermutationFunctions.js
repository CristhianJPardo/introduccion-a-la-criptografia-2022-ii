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
