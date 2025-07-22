import { S3Client } from "bun";

// CloudFlare R2
const r2 = new S3Client({
  accessKeyId: Bun.env.R2_ACCESS_KEY_ID,
  secretAccessKey: Bun.env.R2_SECRET_ACCESS_KEY,
  bucket: Bun.env.R2_BUCKET_NAME,
  endpoint: Bun.env.R2_ENDPOINT,
});

const generatePresignedUrl = (key: string, expiresIn: number) => {
  const url = r2.presign(key, {
    method: "PUT",
  });
  return url;
};
export { r2,generatePresignedUrl };
