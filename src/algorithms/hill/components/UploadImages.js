import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react'

export const UploadImages = () => {
    const [images, setImages] = useState([]);
    const [imageURLs, setImageURLs] = useState([])

    useEffect(() => {
        if (images.length < 1) return;
        const newImageUrls = [];
        images.forEach(image => newImageUrls.push(URL.createObjectURL(image)));
        setImageURLs(newImageUrls);
    }, [images]);

    function onImageChange(e) {
        setImages([...e.target.files]);
        console.log(imageURLs);
        console.log(images)
    }
    return (
        <div>
            <input type="file" multiple accept='image/*' onChange={onImageChange} />
            {imageURLs.map((imageSrc, i) => <img key={i.toString()} src={imageSrc} />)}
        </div>
    )
}

export default UploadImages;