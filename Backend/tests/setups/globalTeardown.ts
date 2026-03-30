import { PrismaClient } from "@prisma/client";

const globalTeardown = async () => {
    const prisma = new PrismaClient();
  try {
    await prisma.note.deleteMany();
  } catch (error: any) {
    throw Error(error);
  } finally {
    await prisma.$disconnect();
  }
};

export default globalTeardown;
