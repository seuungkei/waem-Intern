const request = require('supertest');

const { mysqlDatabase } = require('../api/models/dbconfig');
const { createApp } = require('../app');

describe('USER_API', () => {
  let app;

  beforeAll(async () => {
    app = createApp();
    await mysqlDatabase.initialize();
    await mysqlDatabase.query(
      `
      INSERT INTO regions
        (name)
      VALUES
        ("서울특별시")
      `
    );
    await mysqlDatabase.query(
      `
      INSERT INTO cities
        (name)
      VALUES
        ("강남구")
      `
    );
    await mysqlDatabase.query(
      `
      INSERT INTO address
        (name)
      VALUES
        ("압구정동")
      `
    );
  });

  afterAll(async () => {
    await mysqlDatabase.query(`SET foreign_key_checks = 0`);
    await mysqlDatabase.query(`TRUNCATE users`);
    await mysqlDatabase.query(`SET foreign_key_checks = 1`);
    await mysqlDatabase.destroy();
  });

  test('SUCCESS : SIGN_UP', async () => {
    const response = await request(app).post('/user/signup').send({
      name: 'kim',
      nickname: 'sueng',
      email: 'wecode@mail.com',
      password: '1q2w3e4r!',
      passwordCheck: '1q2w3e4r!',
      regionId: 1,
      cityId: 1,
      addressId: 1,
    });

    expect(response.status).toEqual(201);
    expect(response.body).toEqual({ message: 'SIGNUP_SUCCESS' });
  });

  test('FAILED : EMAIL_ALREADY_EXISTS', async () => {
    const response = await request(app).post('/user/emailCheck').send({
      name: 'kim',
      nickname: 'sueng',
      email: 'wecode@mail.com',
      password: '1q2w3e4r!',
      passwordCheck: '1q2w3e4r!',
      regionId: 1,
      cityId: 1,
      addressId: 1,
    });

    expect(response.status).toEqual(409);
    expect(response.body).toEqual({ message: 'EMAIL_ALREADY_EXISTS' });
  });

  test('FAILED : KEY_ERROR_EMAIL', async () => {
    const response = await request(app).post('/user/signup').send({
      name: 'kim',
      nickname: 'sueng',
      password: '1q2w3e4r!',
      passwordCheck: '1q2w3e4r!',
      regionId: 1,
      cityId: 1,
      addressId: 1,
    });

    expect(response.status).toEqual(400);
    expect(response.body).toEqual({ message: 'KEY_ERROR' });
  });

  test('SUCCESS : SIGN_IN', async () => {
    const response = await request(app).post('/user/signin').send({
      email: 'wecode@mail.com',
      password: '1q2w3e4r!',
    });

    expect(response.status).toEqual(201);
    expect(response.body.accessToken).toBeTruthy();
  });

  test('FAILED : CHECK_EMAIL', async () => {
    const response = await request(app).post('/user/signin').send({
      email: 'wecode1@mail.com',
      password: '1q2w3e4r!',
    });

    expect(response.status).toEqual(401);
    expect(response.body).toHaveProperty('message', 'PLEASE_CHECK_YOUR_EMAIL');
  });

  test('FAILED : CHECK_PASSWORD', async () => {
    const response = await request(app).post('/user/signin').send({
      email: 'wecode@mail.com',
      password: 'wrong_password!',
    });

    expect(response.status).toEqual(401);
    expect(response.body).toHaveProperty('message', 'PLEASE_CHECK_YOUR_PASSWORD');
  });
});
