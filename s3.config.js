const AWS = require('aws-sdk');
const axios = require('axios');

AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION
});

const s3 = new AWS.S3();

const getContentType = (extension) => {
  const mimeTypes = {
      jpg: 'image/jpeg',
      jpeg: 'image/jpeg',
      png: 'image/png'
  };
  return mimeTypes[extension] || 'application/octet-stream';
};

// Function to upload a file
const uploadImageFromUrl = async (imageUrl, bucketName, folder, fileName) => {
  try {
      const response = await axios({
          url: imageUrl,
          method: 'GET',
          responseType: 'stream'
      });

      const extension = fileName.split('.').pop();
      const contentType = getContentType(extension);

      const uploadParams = {
          Bucket: bucketName,
          Key: `${folder}/${fileName}`,
          Body: response.data,
          ContentType: contentType,
          ACL: 'public-read'
      };

      const result = await s3.upload(uploadParams).promise();

      return result.Location;
  } catch (error) {
      console.error('Error in uploading image from URL:', error);
      throw error;
  }
};


module.exports = { uploadImageFromUrl };