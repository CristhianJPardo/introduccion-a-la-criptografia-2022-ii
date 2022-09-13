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

    //compute adjoint matrix 
    let inv = math.inv(A)
    let adj = math.multiply(inv, det)
    //round values to get ints
    adj = math.map(adj, (value) => { return math.round(value) })

    let invMod = math.multiply(adj, modInverse(det, modn));
    // to get matrix with only positives 
    invMod = math.map(invMod, (value) => { return ((value % modn) + modn) % modn })
    //console.log("RESULT ------------------------------")
    //console.log(invMod)
    //console.log("------------------------------")
    //console.log(hillCipher([[0, 1, 2], [3, 4, 5], [1, 2, 3], [3, 1, 2]], [[2, 1, 4], [3, 1, 0], [1, 0, 3]]), 26)
    return invMod

}

let hillCipher = (matrixToCipher, hillMatrix, modn = 26) => {
    hillMatrix = math.matrix(hillMatrix)
    let blockSize = hillMatrix.size()[0]
    let myHillMatrix = math.matrix(hillMatrix)
    if (matrixToCipher[1].length % blockSize != 0) {
        console.error(matrixToCipher[0].length, " and  blocksize", blockSize)
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

export function keyAndInverseSearcher(plainText, ciphered, blocksize = 3, nmod = 26) {
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
