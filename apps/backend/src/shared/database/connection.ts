import { PrismaClient } from '@prisma/client';

let instance: PrismaClient | null = null;

export function getInstance(): PrismaClient {
  if (!instance) {
    instance = new PrismaClient({
      log:
        process.env.NODE_ENV === 'development' ? ['query', 'error'] : ['error'],
    });
  }
  return instance;
}

export async function disconnect(): Promise<void> {
  if (instance) {
    await instance.$disconnect();
    instance = null;
  }
}

export const db = getInstance();
