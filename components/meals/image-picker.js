'use client'
import Image from 'next/image'
import classes from './image-picker.module.css';
import { useRef, useState } from 'react'
 
export default function ImagePicker({label, name}){

    const imageInput = useRef();
    const [pickedImage, setPickedImage] = useState();

    const handlePickClick = () => {
        imageInput.current.click()
    }

    const handleImageChange = (event) => {
        const file = event.target.files[0];

        if(!file){
            setPickedImage(null);
            return;
        }

        const fileReader = new FileReader() // tạo file hình ảnh tạm trong chính máy của client

        fileReader.onload = () => {
            setPickedImage(fileReader.result);
        }

        fileReader.readAsDataURL(file);
    }
 
    return <div className={classes.picker}>
        <label htmlFor={name}>{label}</label>
        <div className={classes.controls}>
            <div className={classes.preview}>
                {!pickedImage && <p>No image picked yet.</p>}
                {pickedImage && <Image src={pickedImage} alt="The image selected by user." fill/>}
            </div>
            <input 
                accept="image/png, image/jpeg" 
                className={classes.input}
                ref={imageInput}
                type="file" 
                name={name}
                id={name}
                onChange={handleImageChange}
                required
            />
            <button 
                className={classes.button}
                type="button"
                onClick={handlePickClick}
            >
                Pick an Image
            </button>
        </div>
    </div>
}