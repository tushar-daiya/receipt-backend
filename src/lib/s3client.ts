import {
  S3Client,
  ListBucketsCommand,
  ListObjectsV2Command,
  GetObjectCommand,
  PutObjectCommand,
} from "@aws-sdk/client-s3";

import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const R2_ENDPOINT = process.env.R2_ENDPOINT as string;
const ACCESS_KEY_ID = process.env.R2_ACCESS_KEY_ID as string;
const SECRET_ACCESS_KEY = process.env.R2_SECRET_ACCESS_KEY as string;
const BUCKET_NAME = process.env.R2_BUCKET_NAME as string;
const S3 = new S3Client({
  region: "auto",
  endpoint: R2_ENDPOINT,
  credentials: {
    accessKeyId: ACCESS_KEY_ID,
    secretAccessKey: SECRET_ACCESS_KEY,
  },
});

const generatePresignedUrl = async (key: string, expiresIn: number) => {
  const url = await getSignedUrl(
    S3,
    new PutObjectCommand({ Bucket: BUCKET_NAME, Key: key }),
    { expiresIn }
  );
  return url;
};
export { S3, generatePresignedUrl };
