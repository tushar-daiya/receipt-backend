import { S3Client } from "@aws-sdk/client-s3";
declare const S3: S3Client;
declare const generatePresignedUrl: (key: string, expiresIn: number) => Promise<string>;
export { S3, generatePresignedUrl };
