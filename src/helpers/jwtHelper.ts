import jwt, { JwtPayload, Secret, SignOptions } from "jsonwebtoken";

const generateToken = (
  payload: string | object | Buffer,
  secret: jwt.Secret,
  expiresIn: string | number
) => {
  const options: object | SignOptions = {
    expiresIn,
    // algorithm: "HS256", // Explicitly set algorithm if needed
  };

  const token = jwt.sign(payload, secret, options);

  return token;
};

const verifyToken = (token: string, secret: Secret) => {
  const verify = jwt.verify(token, secret) as JwtPayload;
  return verify;
};
export const jwtHelpers = {
  generateToken,
  verifyToken,
};
