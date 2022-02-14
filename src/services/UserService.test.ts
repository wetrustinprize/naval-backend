import CreateUserArguments from '@interfaces/User/CreateUserArguments';
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

  const createUserArguments: CreateUserArguments = {
    email: createdUser.email,
    password: createdUser.password,
    username: createdUser.username,
  };

  it('should be able to create a user', async () => {
    prismaMock.user.create.mockResolvedValue(createdUser);

    await expect(UserService.create(createUserArguments)).resolves.toEqual(createdUser);
  });

  it('should not be able to create a user with same username', async () => {
    prismaMock.user.findFirst.mockResolvedValue({
      ...createdUser,
    });

    await expect(UserService.create(createUserArguments)).rejects.toEqual(new Error('username already taken'));
  });

  it('should not be able to create a user with same email', async () => {
    prismaMock.user.findFirst
      .mockResolvedValueOnce(null)
      .mockResolvedValueOnce({ ...createdUser });

    await expect(UserService.create(createUserArguments)).rejects.toEqual(new Error('email already in use'));
  });
});
