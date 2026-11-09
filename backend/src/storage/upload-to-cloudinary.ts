/**
 * Utility script to upload 3D models or images directly to Cloudinary
 * Usage: npx ts-node src/storage/upload-to-cloudinary.ts <path-to-file> [folder] [raw|image]
 */
import { v2 as cloudinary } from 'cloudinary';
import * as path from 'path';
import * as dotenv from 'dotenv';

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || 'techmarketplace',
  api_key: process.env.CLOUDINARY_API_KEY || '956926632376424',
  api_secret: process.env.CLOUDINARY_API_SECRET || 'vBndczbYx4Z9eBq-h7Hhi1UMzfk',
  secure: true,
});

async function main() {
  const filePath = process.argv[2];
  if (!filePath) {
    console.error('Vui lòng chỉ định đường dẫn file: npx ts-node src/storage/upload-to-cloudinary.ts <file_path>');
    process.exit(1);
  }

  const ext = path.extname(filePath).toLowerCase();
  const is3DModel = ['.glb', '.gltf', '.bin', '.obj', '.fbx', '.usdz'].includes(ext);
  const resourceType = (process.argv[4] as 'image' | 'raw') || (is3DModel ? 'raw' : 'image');
  const folder = process.argv[3] || (is3DModel ? 'teaching-platform/models-3d' : 'teaching-platform/images');
  const filename = path.basename(filePath, ext);

  console.log(`Đang tải file lên Cloudinary...`);
  console.log(`File: ${filePath}`);
  console.log(`Loại tài nguyên: ${resourceType}`);
  console.log(`Thư mục đích: ${folder}`);

  try {
    const res = await cloudinary.uploader.upload(filePath, {
      folder,
      resource_type: resourceType,
      public_id: filename,
      use_filename: true,
      unique_filename: false,
      overwrite: true,
    });

    console.log('\n✓ TẢI LÊN CLOUDINARY THÀNH CÔNG!');
    console.log('Public ID:', res.public_id);
    console.log('Secure URL (Dùng cho Three.js / Image):', res.secure_url);
    console.log('Resource Type:', res.resource_type);
    console.log('Format:', res.format);
    console.log('Size:', (res.bytes / 1024).toFixed(2), 'KB');
  } catch (error: any) {
    console.error('Lỗi khi tải file lên Cloudinary:', error.message || error);
    process.exit(1);
  }
}

main();
