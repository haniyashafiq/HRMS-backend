import jwt, { type Secret, SignOptions} from "jsonwebtoken";
import type { JwtPayload } from "../interfaces/jwt.interface.js";
import type { StringValue } from "ms";
if (!process.env.JWT_SECRET) {
  throw new Error("JWT_SECRET must be set");
}
const JWT_SECRET: Secret = process.env.JWT_SECRET!;

// Use seconds for token expiration
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN as StringValue || "1d"; // or 'as StringValue'

export const generateToken = (payload: JwtPayload): string => {
  const options: SignOptions = { expiresIn: JWT_EXPIRES_IN };
  return jwt.sign(payload, JWT_SECRET, options);
};


export const verifyToken = (token: string): JwtPayload | null => {
  try {
    return jwt.verify(token, JWT_SECRET) as JwtPayload;
  } catch {
    return null;
  }
};
