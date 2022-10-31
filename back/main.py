from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI, File
from pydantic import BaseModel
from PIL import Image, ImageOps
from functions import *
import base64
import io


app = FastAPI()

origins = [
    "http://localhost:3000",
    "http://localhost:3001",
    "https://cristhianjpardo.github.io/introduccion-a-la-criptografia-2022-ii/",
    "https://cristhianjpardo.github.io/introduccion-a-la-criptografia-2022-ii"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
async def main():
    return {"Hello World (from backend)"}


class TextData(BaseModel):
    text: str


class ImageData(BaseModel):
    file: bytes


@app.post("/texto")
async def recibirTexto(data: TextData):
    print(data)
    return {toUpper(data.text)}


@app.post("/upload")
async def recieveFile(file: bytes = File(...)):

    image = Image.open(io.BytesIO(file))
    gray = ImageOps.grayscale(image)
    # gray.save("gray.jpg")
    # gray.show()
    buffered = io.BytesIO()
    gray.save(buffered, format="JPEG")
    img_str = base64.b64encode(buffered.getvalue())

    return img_str


@app.post("/upload_aes_encrypt")
async def recieveFile(file: bytes = File(...), key: int = 16, mode: str = "ECB"):
    print(f"**********{key}**********{mode}")
    image = Image.open(io.BytesIO(file))
    # image = Image.open("test-medium.jpg")
    if mode == 'ECB':
        encrypted_img = encryptAESECB(image, 32)
    elif mode == 'CBC':
        encrypted_img = encryptAESECB(image, 32)
    elif mode == 'OFB':
        encrypted_img = encryptAESOFB(image, 32)
    elif mode == 'CFB':
        encrypted_img = encryptAESCFB(image, 32)
    elif mode == 'CTR':
        encrypted_img = encryptAESCTR(image, 32)

    buffered = io.BytesIO()
    encrypted_img.save(buffered, format="JPEG")
    encrypted_image_str = base64.b64encode(buffered.getvalue())
    return encrypted_image_str


@app.post("/upload_sdes_encrypt")
async def recibirTexto(data: TextData, key: int = 16):
    print(f"*********{data.text}**********{key}")
    print(f"**********{encrypt(int(key), int(data.text))}**********")
    return {str(encrypt(int(key), int(data.text)))}
