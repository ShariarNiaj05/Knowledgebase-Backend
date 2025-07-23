import multer from "multer";
import path from "path";
import fs from "fs";
import { v2 as cloudinary } from "cloudinary";
import config from "../config";
import { ICloudinaryResponse, IFile } from "../app/interfaces/file";

// Configuration
cloudinary.config({
  cloud_name: "dxj81xe7h",
  api_key: config.CLOUDINARY_API_KEY,
  api_secret: config.CLOUDINARY_API_SECRET,
});

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(process.cwd(), "uploads"));
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

const uploadToCloudinary = async (
  file: IFile
): Promise<ICloudinaryResponse | undefined> => {
  // Upload an image
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload(
      file.path,
      // {
      //   public_id: file.originalname,
      // },
      (error: Error, result: ICloudinaryResponse) => {
        fs.unlinkSync(file.path);
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      }
    );
  });
};
export const fileUploader = {
  upload,
  uploadToCloudinary,
};
