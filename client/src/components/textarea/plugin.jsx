import { toast } from "react-toastify";
import store from "../../sagas/configureStore";
import { uploadImage } from "../../sagas/posts/request";
export function uploadPlugin(editor) {
    editor.plugins.get("FileRepository").createUploadAdapter = (loader) => {
        return new CustomUploadAdapter(loader, uploadImage);
    };
}
class CustomUploadAdapter {
    constructor(loader, uploadImage) {
        this.loader = loader;
        this.uploadImage = uploadImage;
    }

    async upload() {
        console.log('Attempting to upload...');
        try {
            const file = await this.loader.file;
            if (!file.type.startsWith('image/')) {
                throw new Error('The uploaded file is not an image.');
            }
            this.loader.uploadTotal = file.size;
            this.loader.uploaded = 0;
            const data = {
                image: file
            };
            const response = await this.uploadImage(data, {
                onUploadProgress: progressEvent => {
                    console.log("🚀 ~ file: plugin.jsx:29 ~ CustomUploadAdapter ~ upload ~ progressEvent:", progressEvent)
                    const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                    console.log("🚀 ~ file: plugin.jsx:31 ~ CustomUploadAdapter ~ upload ~ progress:", progress);
                    this.loader.uploaded = progressEvent.loaded;
                }
            });
            const responseData = await response?.data;
            if (responseData && responseData.url) {
                this.loader.uploaded = this.loader.uploadTotal;
                toast.success('Tải ảnh lên thành công', {
                    position: "bottom-center",
                })
                return { default: responseData.url };
            } else {
                toast.error('Tải ảnh lên thất bại')
                throw new Error('Upload failed');
            }
        } catch (error) {
            console.error("Upload error: ", error);
            throw error;
        }
    }

}