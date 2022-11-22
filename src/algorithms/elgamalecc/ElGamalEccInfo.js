import * as React from 'react';
import Paper from '@mui/material/Paper';
// import { MathComponent } from "mathjax-react";
import Divider from '@mui/material/Divider';
import { Typography } from '@mui/material';

export const ElGamalEccInfo = () => {
    return (
        <Paper sx={{ width: "auto", margin: 'auto', overflow: 'hidden', pl: 2, textAlign: "left" }}>
            <Typography
                variant='h5'
                sx={{ mt: 2 }}
            >S-DES : Info</Typography>
            <Divider sx={{ mt: 1, mb: 1 }} />
            <Typography variant='h6'>What is S-DES cipher?</Typography>
            <br></br>
            The SDES encryption algorithm produces an 8-bit block of plaintext (example: 10111101) and a 10-bit key as input and makes an 8-bit block of ciphertext as output. The S-DES decryption algorithm takes an 8-bit block of ciphertext and the same 10-bit key can develop that ciphertext as input and makes the initial 8-bit block of plaintext.
            <br></br>
            These algorithms generate a key and thus encapsulate the message with this key. There are two types of encryptions: asymmetric and symmetric, which are in vogue.
            <br></br>
            <Typography variant='h6'>Presentation Layer</Typography>

            The presentation layer in S-DES manages the translation, encryption/decryption, authentication and compression. These are explained below
            <br></br>
            <Typography variant='h6'>Translation</Typography>

            It can transform the complex data structures used by an application string, integers, structures, etc., into a byte flow that can be shared across the network. The message is defined so that communicating devices agree to the structure of the data being transformed. For instance, ASCII or EBCDIC character sets.
            <br></br>
            <Typography variant='h6'>Encryption/Decryption</Typography>

            It can handle security and privacy issues. Encryption can scramble the information so that only authorized persons can unscramble the conversation information. Decryption shifts the encryption procedure to interpret the message back into its original form.
            <br></br>
            There are two types of Encryption which are as follows
            <br></br>
            Asymmetric Encryption  There are two numerically associated keys, such as the name public key and private keys that are created to encrypt and decrypt the message. Asymmetric encryption is considered more secure than symmetric encryption.
            <br></br>
            Symmetric Encryption  Symmetric encryption is also defined as conventional or single key Encryption. It is based on a secret key, which both communicating parties share. The sending party encrypts the plain text to cipher text messages using the secret key. The receiving party on receipt of the ciphertext message uses a similar secret key to decrypt it to plain text.
            <br></br>
            Authentication
            It can test the antecedents of the remote party being the real party instead of an impostor. It represents that the message is received from an authentic person, not from an impostor. A digital signature is one of the multiple authentication methods that use the public key encryption method.
            <br></br>
            Data Compression
            It compresses data to reduce the amount of transmitted data, thus storing in bandwidth and money. There are three general techniques of data compression. Each method treated that the data stream can be changed into a more compact definition. This compact data stream is regenerated back into the original information at the destination device.
        </Paper>
    )
}
