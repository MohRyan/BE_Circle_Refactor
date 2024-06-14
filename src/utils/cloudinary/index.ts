import {v2} from "cloudinary"
import { override } from "joi"

const cloudinary = v2

cloudinary.config({
    secure:true
})

console.log(cloudinary.config())

export const uploadImage = async (imagePath:string) =>{
    const option = {
        use_filename:true,
        unique_filename: false,
        overwrite: true
    }
    try {
        const result = await cloudinary.uploader.upload(imagePath, option)
        console.log(result)
        return result.public_id
    } catch (error) {
        console.log(error)
    }
}
