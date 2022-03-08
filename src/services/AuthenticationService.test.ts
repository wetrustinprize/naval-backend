import { User } from '@prisma/client';
import prismaMock from '@utils/prisma.test';
import bcryptjs from 'bcryptjs';
import AuthenticationService from './AuthenticationService';

require('dotenv').config();

describe('Authentication Service', () => {
  const createdUser: User = {
    createdAt: new Date(),
    email: 'test@email.com',
    id: 'uuid',
    password: '123',
    updatedAt: new Date(),
    username: 'username',
  };

  it('should be able to get the authorization token', async () => {
    const hashPassword = await bcryptjs.hash(createdUser.password, await bcryptjs.genSalt());

    prismaMock.user.findFirst.mockResolvedValue({
      ...createdUser,
      password: hashPassword,
    });

    expect(AuthenticationService.authenticate({
      username: createdUser.username,
      password: createdUser.password,
    })).resolves.not.toEqual(undefined);
  });

  it('should not be able to get the authorization with incorrect password', async () => {
    const hashPassword = await bcryptjs.hash(createdUser.password, await bcryptjs.genSalt());

    prismaMock.user.findFirst.mockResolvedValue({
      ...createdUser,
      password: hashPassword,
    });

    expect(AuthenticationService.authenticate({
      username: createdUser.username,
      password: 'incorrect password',
    })).rejects.toEqual(new Error('invalid password'));
  });

  it('should not be able to find a non existing username', async () => {
    prismaMock.user.findFirst.mockResolvedValue(null);

    expect(AuthenticationService.authenticate({
      username: 'non existing username',
      password: 'incorrect password',
    })).rejects.toEqual(new Error('user not found'));
  });
});
