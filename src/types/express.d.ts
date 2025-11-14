import { UserAccount } from "@prisma/client";

declare global {
  namespace Express {
    interface Request {
      user?: UserAccount;
    }
  }
}
