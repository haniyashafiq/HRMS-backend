import { type Request, type Response, type NextFunction } from 'express';
import { verifyToken } from '../utils/jwt.js';
import prisma from '../database/prisma.js';
import type { JwtPayload } from '../interfaces/jwt.interface.js';
import ApiError from '../utils/ApiError.js';
import type { IUser } from '../interfaces/user.interface.js';
export const authenticate = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader?.startsWith('Bearer ')) {
      throw new ApiError(401, 'No token provided');
    }

    const token = authHeader.split(' ')[1];
    const decoded: JwtPayload | null = verifyToken(token);

    if (!decoded) {
      throw new ApiError(401, 'Invalid token');
    }

    const user = await prisma.userAccount.findUnique({
      where: { id: decoded.id },
    });

    if (!user) {
      throw new ApiError(404, 'User not found');
    }

    req.user = user as IUser; // TypeScript now knows `req.user` exists
    next();
  } catch (err) {
    next(err);
  }
};
