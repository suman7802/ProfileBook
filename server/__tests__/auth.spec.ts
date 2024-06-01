import request from 'supertest';
import { app } from '../src/index';
import { Role } from '@prisma/client';
import { sharedState } from './sharedState';

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

        ({ otp: sharedState.otp, email: sharedState.email } = res.body.user);
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

  describe('verify', () => {
    it('should require email and otp', async () => {
      const res = await request(app).put('/api/auth/verify');

      expect(res.statusCode).toEqual(400);
      expect(res.body).toHaveProperty('message', 'email and otp required');
    });

    it('should handle non-existing user', async () => {
      const res = await request(app).put('/api/auth/verify').send({
        otp: '123456',
        email: 'non-existing@example.com',
      });

      expect(res.statusCode).toEqual(404);
      expect(res.body).toHaveProperty('message', 'User Not Found');
    });

    it('should handle invalid OTP', async () => {
      const res = await request(app).put('/api/auth/verify').send({
        otp: 'invalid-otp',
        email: sharedState.email,
      });

      expect(res.statusCode).toEqual(400);
      expect(res.body).toHaveProperty('message', 'invalid OTP');
    });

    it('should verify a user', async () => {
      const res = await request(app).put('/api/auth/verify').send({
        otp: sharedState.otp,
        email: sharedState.email,
      });

      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('message', 'User verified successfully');
    });

    it('should handle already verified user', async () => {
      const res = await request(app).put('/api/auth/verify').send({
        otp: sharedState.otp,
        email: sharedState.email,
      });

      expect(res.statusCode).toEqual(400);
      expect(res.body).toHaveProperty('message', 'User already verified');
    });
  });
});
