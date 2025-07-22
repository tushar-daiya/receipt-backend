"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generatePresignedUrl = exports.S3 = void 0;
const client_s3_1 = require("@aws-sdk/client-s3");
const s3_request_presigner_1 = require("@aws-sdk/s3-request-presigner");
const R2_ENDPOINT = process.env.R2_ENDPOINT;
const ACCESS_KEY_ID = process.env.R2_ACCESS_KEY_ID;
const SECRET_ACCESS_KEY = process.env.R2_SECRET_ACCESS_KEY;
const BUCKET_NAME = process.env.R2_BUCKET_NAME;
const S3 = new client_s3_1.S3Client({
    region: "auto",
    endpoint: R2_ENDPOINT,
    credentials: {
        accessKeyId: ACCESS_KEY_ID,
        secretAccessKey: SECRET_ACCESS_KEY,
    },
});
exports.S3 = S3;
const generatePresignedUrl = async (key, expiresIn) => {
    const url = await (0, s3_request_presigner_1.getSignedUrl)(S3, new client_s3_1.PutObjectCommand({ Bucket: BUCKET_NAME, Key: key }), { expiresIn });
    return url;
};
exports.generatePresignedUrl = generatePresignedUrl;
//# sourceMappingURL=s3client.js.map