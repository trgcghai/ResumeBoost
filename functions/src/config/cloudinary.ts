import { v2 as cloudinary } from "cloudinary";
import * as functions from "firebase-functions";

// Configure Cloudinary
const config = functions.config();

cloudinary.config({
  cloud_name:
    config.cloudinary?.cloud_name ||
    process.env.CLOUDINARY_CLOUD_NAME ||
    "dthvciqeu",
  api_key:
    config.cloudinary?.api_key ||
    process.env.CLOUDINARY_API_KEY ||
    "784973211484813",
  api_secret:
    config.cloudinary?.api_secret ||
    process.env.CLOUDINARY_API_SECRET ||
    "xUCqcqZzL-MXXHS9drIsaZ4q5LU",
});

export default cloudinary;
