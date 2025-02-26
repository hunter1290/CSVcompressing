const sharp = require('sharp');
const axios = require('axios');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

async function compressImage(url) {
    try {
        const response = await axios({ url, responseType: 'arraybuffer' });
        const imageBuffer = Buffer.from(response.data);
        const compressedImage = await sharp(imageBuffer).jpeg({ quality: 50 }).toBuffer();
        
        const outputFilename = `compressed-${path.basename(url)}`;
        fs.writeFileSync(`./uploads/${outputFilename}`, compressedImage);
        
        return `http://localhost:${process.env.PORT}/uploads/${outputFilename}`;
    } catch (error) {
        console.error('Error compressing image:', error);
        return url; // Return original URL in case of failure
    }
}

module.exports = { compressImage };