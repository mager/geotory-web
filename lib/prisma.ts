import { PrismaClient, User } from "@prisma/client";

declare global {
  var prisma: PrismaClient | undefined;
}

const prisma = global.prisma || new PrismaClient();

if (process.env.NODE_ENV === "development") global.prisma = prisma;

export default prisma;

async function getDatasets(user: User) {
  const response = await prisma?.dataset.findMany({
    where: {
      userId: user.id,
    },
  });
  return response;
}

export { getDatasets };
