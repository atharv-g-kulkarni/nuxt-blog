import cloudinary from 'cloudinary';
let receivedChunks = [];
const config = useRuntimeConfig();

export default defineEventHandler(async(event)=>{
    const body = await readBody(event);
    const { chunkIndex, totalChunks, chunk} = body;
    receivedChunks[chunkIndex] = chunk;
    if(receivedChunks.length === totalChunks) {
        const completeData = receivedChunks.join('');
        receivedChunks = [];
        cloudinary.config({
            cloud_name: config.CLOUDINARY_CLOUD_NAME,
            api_key: config.CLOUDINARY_API_KEY,
            api_secret: config.CLOUDINARY_API_SECRET
        });
        try {
            const result = await cloudinary.v2.uploader.upload_large(completeData,{
                chunk_size: 50000,
                upload_preset: "blog-images",
                resource_type: "auto"
            });
            return {links:result.url};
        } catch (error) {
            console.log(error);
        }
        return {links:null};
    }
})