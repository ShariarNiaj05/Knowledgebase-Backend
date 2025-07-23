import { UserRole } from "@prisma/client";

export type IAuthUser = {
  role: UserRole;
  email: string;
} | null;
