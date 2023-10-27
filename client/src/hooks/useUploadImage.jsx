import { useEffect, useState } from "react";
import { uploadImage } from "../sagas/posts/request";

export default function useUploadImage(token, file) {
    const [image, setImage] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleUploadImage = async () => {
        setIsLoading(true)
        try {
            if (file) {
                const response = await uploadImage(token, file);
                if (!response) return setImage('')
                setImage(response.data.url)
            } else {
                return setImage('')
            }
        } catch (error) {
            console.log('err', error);
        }
        setIsLoading(false)
    }
    useEffect(() => {
        handleUploadImage()
    }, [file]);
    return { image, handleUploadImage, isLoading }
}