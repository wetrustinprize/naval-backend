import { User } from '@prisma/client';
import prismaMock from '@utils/prisma.test';
import UserService from './UserService';

describe('User Service', () => {
  const createdUser: User = {
    createdAt: new Date(),
    email: 'test@email.com',
    id: 'uuid',
    password: '123',
    updatedAt: new Date(),
    username: 'username',
  };

  it('Should be able to create a user', async () => {
    prismaMock.user.create.mockResolvedValue(createdUser);

    await expect(UserService.create({
      email: createdUser.email,
      password: createdUser.password,
      username: createdUser.username,
    })).resolves.toEqual(createdUser);
  });
});
