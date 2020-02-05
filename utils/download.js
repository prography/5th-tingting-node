const AWS = require('aws-sdk')

AWS.config.update({
    region: 'ap-northeast-2',
    accessKeyId: process.env.S3_ACCESS_KEY_ID,
    secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
});

const download = async (key) => {
    try {
        const params = { Bucket: process.env.BUCKET, Key: key }
        const s3 = new AWS.S3()
        console.log(key)
        await s3.headObject(params).promise()
        const stream = s3.getObject(params).createReadStream()
        return stream
    } catch (error) {
        console.log(error)
        return false
    }
}

module.exports = download

