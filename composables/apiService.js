export const configurableFetch = async (url, options = {}) => {
    const defaultOptions = {
      method: 'GET', // Default method
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const finalOptions = { ...defaultOptions, ...options };
    try {
      const response = await fetch(url,finalOptions);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  };

export const sendChunks = async (imageFile)=>{
  const chunkSize = 50*1024;
  const totalChunks = Math.ceil(imageFile.length/chunkSize);
  for(let i=0;i<totalChunks;i++){
    const start = i*chunkSize;
    const end = Math.min(start + chunkSize, imageFile.length);
    const chunk = imageFile.substring(start, end);
    const payload = {
      chunkIndex: i,
      totalChunks: totalChunks,
      chunk: chunk
    }
    const data = await $fetch("/api/imageupload",{
      method: "POST",
      referrerPolicy:"no-referrer",
      body: JSON.stringify(payload)
    })
    if(data?.links){
      return data.links;
    }
  }
}