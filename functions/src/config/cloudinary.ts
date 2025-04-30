import { v2 as cloudinary } from "cloudinary";
import * as functions from "firebase-functions";
import * as dotenv from "dotenv";

dotenv.config();
// Configure Cloudinary
const config = functions.config();

cloudinary.config({
  cloud_name:
    config.cloudinary?.cloud_name || process.env.CLOUDINARY_CLOUD_NAME,
  api_key: config.cloudinary?.api_key || process.env.CLOUDINARY_API_KEY,
  api_secret:
    config.cloudinary?.api_secret || process.env.CLOUDINARY_API_SECRET,
});

export default cloudinary;
