import { PrismaClient } from "@prisma/client";

const prismaClient = new PrismaClient()

function prisma () {
  return prismaClient
}

export default prisma