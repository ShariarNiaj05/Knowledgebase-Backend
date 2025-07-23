import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.join(process.cwd(), ".env") });

export default {
  env: process.env.NODE_ENV,
  port: process.env.PORT,
  DATABASE_URL: process.env.DATABASE_URL,
  jwt: {
    jwt_secret: process.env.JWT_SECRET,
    expires_in: process.env.EXPIRES_IN,
    refresh_token_secret: process.env.REFRESH_TOKEN_SECRET,
    refresh_token_expires_in: process.env.REFRESH_TOKEN_EXPIRES_IN,
    RESET_PASS_TOKEN: process.env.RESET_PASS_TOKEN,
    RESET_PASS_TOKEN_EXPIRES_IN: process.env.RESET_PASS_TOKEN_EXPIRES_IN,
  },
  RESET_PASS_LINK: process.env.RESET_PASS_LINK,
  emailSender: {
    EMAIL: process.env.EMAIL,
    APP_PASS: process.env.APP_PASS,
  },
  STORE_ID: process.env.STORE_ID,
  STORE_PASS: process.env.STORE_PASS,
  SUCCESS_URL: process.env.SUCCESS_URL,
  CANCEL_URL: process.env.CANCEL_URL,
  FAIL_URL: process.env.FAIL_URL,
  SSL_PAYMENT_API: process.env.SSL_PAYMENT_API,
  SSL_VALIDATION_API: process.env.SSL_VALIDATION_API,
  CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET,
  CLOUDINARY_URL: process.env.CLOUDINARY_URL,
};
