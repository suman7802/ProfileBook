import request from 'supertest';
import { app } from '../src/index';
import { Role } from '@prisma/client';

describe('authController', () => {
  describe('signup', () => {
    it(
      'should create a new user',
      async () => {
        const randomString = Math.random().toString(36).substring(2, 15);
        const email = `new${randomString}@example.com`;

        const res = await request(app).post('/api/auth/signup').send({
          email,
          password: 'HardPassword7802',
          fullName: 'Test User',
          role: Role.USER,
        });

        expect(res.statusCode).toEqual(201);
        expect(res.body).toHaveProperty('user');
        expect(res.body).toHaveProperty('message', 'User created successfully');
      },
      1000 * 30
    );

    it('should not create a new user with invalid email', async () => {
      const res = await request(app).post('/api/auth/signup').send({
        email: 'invalidEmail',
        password: 'password',
        fullName: 'Test User',
        role: Role.USER,
      });

      expect(res.statusCode).toEqual(400);
    });

    it('should not create a new user with invalid admin password', async () => {
      const res = await request(app).post('/api/auth/signup').send({
        email: 'invalidEmail',
        password: 'password',
        fullName: 'Test User',
        role: Role.ADMIN,
        adminPassword: 'invalidAdminPassword',
      });

      expect(res.statusCode).toEqual(400);
    });

    it('should not create a new user with Already email exist', async () => {
      const res = await request(app).post('/api/auth/signup').send({
        email: 'mansu7802@gmail.com',
        password: 'password',
        fullName: 'Test User',
      });

      expect(res.statusCode).toEqual(400);
    });
  });
});
