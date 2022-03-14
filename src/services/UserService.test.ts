import CreateUserArguments from '@interfaces/User/CreateUserArguments';
import { User } from '@prisma/client';
import prismaMock from '@utils/prisma.test';
import UserService from './UserService';

const testUser: User = {
  createdAt: new Date(),
  email: 'test@email.com',
  id: 'uuid',
  password: '123',
  updatedAt: new Date(),
  username: 'username',
  role: 'USER',
};

const createUserArguments: CreateUserArguments = {
  email: testUser.email,
  password: testUser.password,
  username: testUser.username,
};

describe('User Service', () => {
  describe('Creating Users', () => {
    it('should be able to create a user', async () => {
      prismaMock.user.create.mockResolvedValue(testUser);

      await expect(UserService.create(createUserArguments)).resolves.toEqual(testUser);
    });

    it('should not be able to create a user with same username', async () => {
      prismaMock.user.findFirst.mockResolvedValue({
        ...testUser,
      });

      await expect(UserService.create(createUserArguments)).rejects.toEqual(new Error('username already taken'));
    });

    it('should not be able to create a user with same email', async () => {
      prismaMock.user.findFirst
        .mockResolvedValueOnce(null)
        .mockResolvedValueOnce({ ...testUser });

      await expect(UserService.create(createUserArguments)).rejects.toEqual(new Error('email already in use'));
    });
  });

  describe('Deleting Users', () => {
    it('should be able to delete a user by its username', async () => {
      prismaMock.user.findFirst.mockResolvedValue(testUser);
      prismaMock.user.delete.mockResolvedValue(testUser);

      await expect(UserService.delete({ username: testUser.username })).resolves.toBe(testUser);
    });

    it('should be able to delete a user by its id', async () => {
      prismaMock.user.findFirst.mockResolvedValue(testUser);
      prismaMock.user.delete.mockResolvedValue(testUser);

      await expect(UserService.delete({ id: testUser.id })).resolves.toBe(testUser);
    });

    it('should not be able to delete a non existing user', async () => {
      prismaMock.user.findFirst.mockResolvedValue(null);

      await expect(UserService.delete({ username: testUser.username })).rejects.toEqual(new Error('user not found'));
    });
  });
});
