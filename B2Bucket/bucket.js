const B2 = require('backblaze-b2');
const fs = require('fs');
const { PassThrough } = require('stream');
const { promisify } = require('util');
const streamToBuffer = promisify(require('stream-to-buffer'));

const b2 = new B2({
    accountId: 'af23fe522312',
    applicationKey: '005c29823164a1d3400ebac89d0f634ea65ba8959b'
});

module.exports = {
    addFile: async (bucketId, file) => {
        return new Promise((resolve, reject) => {
            b2.authorize().then(async (res) => {
                if (file) {
                    const bucketIdCurrent = "ea7fb2e39fee052282930112";
                    await b2.getUploadUrl({ bucketId: bucketIdCurrent }).then(async (response) => {
                        const { uploadUrl, authorizationToken, bucketId } = response.data;

                        const fileStream = new PassThrough();
                        fileStream.end(file.buffer); // Pass the file buffer to the stream
                        const fileName = file.originalname;

                        try {
                            const buffer = await streamToBuffer(fileStream); // Convert the stream to a Buffer
                            const response = await b2.uploadFile({
                                uploadUrl: uploadUrl,
                                uploadAuthToken: authorizationToken,
                                fileName: fileName,
                                bucketId: bucketId,
                                data: buffer // Use the converted buffer
                            });
                            if (response.status) {
                                resolve(`https://imageprofile.s3.us-east-005.backblazeb2.com/${fileName}`);
                            } else {
                                reject(response.status);
                            }
                        } catch (err) {
                            console.error('Error uploading file to B2:', err);
                            reject(false);
                        }
                    });
                } else {
                    resolve("");
                }
            }).catch((err) => {
                // Handle authentication error
            });
        })
    }
};