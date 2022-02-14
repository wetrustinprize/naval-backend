/* eslint-disable import/no-extraneous-dependencies */
import { PrismaClient, User } from '@prisma/client';
import { mockDeep, mockReset, DeepMockProxy } from 'jest-mock-extended';

import prismaClient from '@utils/prisma';

jest.mock('@utils/prisma', () => ({
  __esModule: true,
  default: mockDeep<PrismaClient>(),
}));

const prismaMock = prismaClient as unknown as DeepMockProxy<PrismaClient>;

beforeEach(() => {
  mockReset(prismaMock);
});

it('sould be able to mock', async () => {
  prismaMock.user.create.mockResolvedValue({} as User);

  await expect(prismaClient.user.create({
    data: {
      email: '@',
      password: '123',
      username: 'a',
    },
  })).resolves.toEqual({});
});

export default prismaMock;
