from time import time
from sys import exit
from PIL import Image
from Crypto.Cipher import AES
from Crypto.Hash import SHA256
from Crypto.Cipher import DES3
from Crypto.Random import get_random_bytes
from Crypto.Util.Padding import pad


def encryptAESECB(img, key_int=16):

    # img = Image.open(img_name)
    try:
        r, g, b, a = img.split()
    except:
        r, g, b = img.split()

    width = img.size[0]
    height = img.size[1]

    A = []
    u = 4
    x = 0.656  # normalization
    for i in range(width * height):
        x = u * x * (1 - x)
        A.append(int(x*255))

    pixels_r = list(r.getdata())
    pixels_g = list(g.getdata())
    pixels_b = list(b.getdata())
    pix_r = pixels_r
    pix_g = pixels_g
    pix_b = pixels_b

    # ------------------------------------------
    redEncrypt = bytearray(b'')
    greenEncrypt = bytearray(b'')
    blueEncrypt = bytearray(b'')
    for index in range(len(A)):
        R = pixels_r[index]
        G = pixels_g[index]
        B = pixels_b[index]
        redEncrypt.append(R)
        greenEncrypt.append(G)
        blueEncrypt.append(B)

    # ------------------------------------------
    key = get_random_bytes(key_int)
    cipher = AES.new(key, AES.MODE_ECB)
    red_bytes = cipher.encrypt(redEncrypt)
    blue_bytes = cipher.encrypt(blueEncrypt)
    green_bytes = cipher.encrypt(greenEncrypt)
    # ------------------------------------------

    for k in range(height*width):
        pix_r[k] = red_bytes[k]
        pix_g[k] = green_bytes[k]
        pix_b[k] = blue_bytes[k]

    r.putdata(pix_r)
    g.putdata(pix_g)
    b.putdata(pix_b)

    tmp = [r, g, b]
    merge_img = Image.merge("RGB", tmp)
    merge_img.save("encrypted_imageAESECB.png", "png")
    return merge_img


def encryptAESOFB(img, key_int=16):

    # img = Image.open(img_name)
    try:
        r, g, b, a = img.split()
    except:
        r, g, b = img.split()

    width = img.size[0]
    height = img.size[1]

    A = []
    u = 4
    x = 0.656  # normalization
    for i in range(width * height):
        x = u * x * (1 - x)
        A.append(int(x*255))

    pixels_r = list(r.getdata())
    pixels_g = list(g.getdata())
    pixels_b = list(b.getdata())
    pix_r = pixels_r
    pix_g = pixels_g
    pix_b = pixels_b

    # ------------------------------------------
    redEncrypt = bytearray(b'')
    greenEncrypt = bytearray(b'')
    blueEncrypt = bytearray(b'')
    for index in range(len(A)):
        R = pixels_r[index]
        G = pixels_g[index]
        B = pixels_b[index]
        redEncrypt.append(R)
        greenEncrypt.append(G)
        blueEncrypt.append(B)

    # ------------------------------------------
    key = get_random_bytes(key_int)
    cipher = AES.new(key, AES.MODE_OFB)
    iv = cipher.iv
    red_bytes = cipher.encrypt(redEncrypt)
    blue_bytes = cipher.encrypt(blueEncrypt)
    green_bytes = cipher.encrypt(greenEncrypt)
    # ------------------------------------------

    for k in range(height*width):
        pix_r[k] = red_bytes[k]
        pix_g[k] = green_bytes[k]
        pix_b[k] = blue_bytes[k]

    r.putdata(pix_r)
    g.putdata(pix_g)
    b.putdata(pix_b)

    tmp = [r, g, b]
    merge_img = Image.merge("RGB", tmp)
    # merge_img.save("encrypted_imageAESOFB.png", "png")
    return merge_img


def encryptAESCFB(img, key_int=16):

    # img = Image.open(img_name)
    try:
        r, g, b, a = img.split()
    except:
        r, g, b = img.split()

    width = img.size[0]
    height = img.size[1]

    A = []
    u = 4
    x = 0.656  # normalization
    for i in range(width * height):
        x = u * x * (1 - x)
        A.append(int(x*255))

    pixels_r = list(r.getdata())
    pixels_g = list(g.getdata())
    pixels_b = list(b.getdata())
    pix_r = pixels_r
    pix_g = pixels_g
    pix_b = pixels_b

    # ------------------------------------------
    redEncrypt = bytearray(b'')
    greenEncrypt = bytearray(b'')
    blueEncrypt = bytearray(b'')
    for index in range(len(A)):
        R = pixels_r[index]
        G = pixels_g[index]
        B = pixels_b[index]
        redEncrypt.append(R)
        greenEncrypt.append(G)
        blueEncrypt.append(B)

    # ------------------------------------------
    key = get_random_bytes(key_int)
    cipher = AES.new(key, AES.MODE_CFB)
    iv = cipher.iv
    red_bytes = cipher.encrypt(redEncrypt)
    blue_bytes = cipher.encrypt(blueEncrypt)
    green_bytes = cipher.encrypt(greenEncrypt)
    # ------------------------------------------

    for k in range(height*width):
        pix_r[k] = red_bytes[k]
        pix_g[k] = green_bytes[k]
        pix_b[k] = blue_bytes[k]

    r.putdata(pix_r)
    g.putdata(pix_g)
    b.putdata(pix_b)

    tmp = [r, g, b]
    merge_img = Image.merge("RGB", tmp)
    # merge_img.save("encrypted_imageAESCFB.png", "png")
    return merge_img


def encryptAESCTR(img, key_int=16):

    # img = Image.open(img_name)
    try:
        r, g, b, a = img.split()
    except:
        r, g, b = img.split()

    width = img.size[0]
    height = img.size[1]

    A = []
    u = 4
    x = 0.656  # normalization
    for i in range(width * height):
        x = u * x * (1 - x)
        A.append(int(x*255))

    pixels_r = list(r.getdata())
    pixels_g = list(g.getdata())
    pixels_b = list(b.getdata())
    pix_r = pixels_r
    pix_g = pixels_g
    pix_b = pixels_b

    # ------------------------------------------
    redEncrypt = bytearray(b'')
    greenEncrypt = bytearray(b'')
    blueEncrypt = bytearray(b'')
    for index in range(len(A)):
        R = pixels_r[index]
        G = pixels_g[index]
        B = pixels_b[index]
        redEncrypt.append(R)
        greenEncrypt.append(G)
        blueEncrypt.append(B)

    # ------------------------------------------
    key = get_random_bytes(key_int)
    cipher = AES.new(key, AES.MODE_CTR)
    nonce = cipher.nonce
    red_bytes = cipher.encrypt(redEncrypt)
    blue_bytes = cipher.encrypt(blueEncrypt)
    green_bytes = cipher.encrypt(greenEncrypt)
    # ------------------------------------------

    for k in range(height*width):
        pix_r[k] = red_bytes[k]
        pix_g[k] = green_bytes[k]
        pix_b[k] = blue_bytes[k]

    r.putdata(pix_r)
    g.putdata(pix_g)
    b.putdata(pix_b)

    tmp = [r, g, b]
    merge_img = Image.merge("RGB", tmp)
    # merge_img.save("encrypted_imageAESCTR.png", "png")
    return merge_img


def toUpper(x):
    return x.upper()


KeyLength = 10
SubKeyLength = 8
DataLength = 8
FLength = 4

# Tables for initial and final permutations (b1, b2, b3, ... b8)
IPtable = (2, 6, 3, 1, 4, 8, 5, 7)
FPtable = (4, 1, 3, 5, 7, 2, 8, 6)

# Tables for subkey generation (k1, k2, k3, ... k10)
P10table = (3, 5, 2, 7, 4, 10, 1, 9, 8, 6)
P8table = (6, 3, 7, 4, 8, 5, 10, 9)

# Tables for the fk function
EPtable = (4, 1, 2, 3, 2, 3, 4, 1)
S0table = (1, 0, 3, 2, 3, 2, 1, 0, 0, 2, 1, 3, 3, 1, 3, 2)
S1table = (0, 1, 2, 3, 2, 0, 1, 3, 3, 0, 1, 0, 2, 1, 0, 3)
P4table = (2, 4, 3, 1)


def perm(inputByte, permTable):
    """Permute input byte according to permutation table"""
    outputByte = 0
    for index, elem in enumerate(permTable):
        if index >= elem:
            outputByte |= (inputByte & (128 >> (elem - 1))
                           ) >> (index - (elem - 1))
        else:
            outputByte |= (inputByte & (128 >> (elem - 1))
                           ) << ((elem - 1) - index)
    return outputByte


def ip(inputByte):
    """Perform the initial permutation on data"""
    return perm(inputByte, IPtable)


def fp(inputByte):
    """Perform the final permutation on data"""
    return perm(inputByte, FPtable)


def swapNibbles(inputByte):
    """Swap the two nibbles of data"""
    return (inputByte << 4 | inputByte >> 4) & 0xff


def keyGen(key):
    """Generate the two required subkeys"""
    def leftShift(keyBitList):
        """Perform a circular left shift on the first and second five bits"""
        shiftedKey = [None] * KeyLength
        shiftedKey[0:9] = keyBitList[1:10]
        shiftedKey[4] = keyBitList[0]
        shiftedKey[9] = keyBitList[5]
        return shiftedKey

    # Converts input key (integer) into a list of binary digits
    keyList = [(key & 1 << i) >> i for i in reversed(range(KeyLength))]
    permKeyList = [None] * KeyLength
    for index, elem in enumerate(P10table):
        permKeyList[index] = keyList[elem - 1]
    shiftedOnceKey = leftShift(permKeyList)
    shiftedTwiceKey = leftShift(leftShift(shiftedOnceKey))
    subKey1 = subKey2 = 0
    for index, elem in enumerate(P8table):
        subKey1 += (128 >> index) * shiftedOnceKey[elem - 1]
        subKey2 += (128 >> index) * shiftedTwiceKey[elem - 1]
    return (subKey1, subKey2)


def fk(subKey, inputData):
    """Apply Feistel function on data with given subkey"""
    def F(sKey, rightNibble):
        aux = sKey ^ perm(swapNibbles(rightNibble), EPtable)
        index1 = ((aux & 0x80) >> 4) + ((aux & 0x40) >> 5) + \
                 ((aux & 0x20) >> 5) + ((aux & 0x10) >> 2)
        index2 = ((aux & 0x08) >> 0) + ((aux & 0x04) >> 1) + \
                 ((aux & 0x02) >> 1) + ((aux & 0x01) << 2)
        sboxOutputs = swapNibbles((S0table[index1] << 2) + S1table[index2])
        return perm(sboxOutputs, P4table)

    leftNibble, rightNibble = inputData & 0xf0, inputData & 0x0f
    return (leftNibble ^ F(subKey, rightNibble)) | rightNibble


def encrypt(key, plaintext):
    """Encrypt plaintext with given key"""
    data = fk(keyGen(key)[0], ip(plaintext))
    return fp(fk(keyGen(key)[1], swapNibbles(data)))
