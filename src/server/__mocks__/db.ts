import { PrismaClient } from '@prisma/client';
import { beforeEach } from 'vitest';
import { mockDeep, mockReset } from 'vitest-mock-extended';

// before each test, reset the mock
beforeEach(() => {
    mockReset(prisma);
});

// mock the prisma client
const prisma = mockDeep<PrismaClient>();
export default prisma;