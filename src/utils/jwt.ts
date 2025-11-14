import jwt, { type Secret} from "jsonwebtoken";
import type { JwtPayload } from "../interfaces/jwt.interface.js";

if (!process.env.JWT_SECRET) {
  throw new Error("JWT_SECRET must be set");
}
const JWT_SECRET: Secret = process.env.JWT_SECRET!;

// Use seconds for token expiration
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN
  ? Number(process.env.JWT_EXPIRES_IN) // e.g., "86400" in env for 1 day
  : 86400; // default 1 day in seconds

export const generateToken = (payload: JwtPayload): string => {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
};



export const verifyToken = (token: string): JwtPayload | null => {
  try {
    return jwt.verify(token, JWT_SECRET) as JwtPayload;
  } catch {
    return null;
  }
};
