import { PrismaClient } from "@/generated/prisma";

const prisma = new PrismaClient();

const globalForPrisma = { prisma: typeof prisma };

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

export default prisma;
