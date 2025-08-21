const request = require('supertest');
const app = require('../src/app');
const User = require('../src/models/user');

let authToken;

beforeAll(async () => {
  // Create a test user and get token
  await User.create({
    email: 'pref_test@example.com',
    password: 'password123'
  });
  
  const res = await request(app)
    .post('/auth/login')
    .send({
      email: 'pref_test@example.com',
      password: 'password123'
    });
  
  authToken = res.body.token;
});

describe('Preferences Endpoints', () => {
  it('should get user preferences', async () => {
    const res = await request(app)
      .get('/preferences')
      .set('Authorization', `Bearer ${authToken}`);
    
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('categories');
    expect(res.body).toHaveProperty('languages');
  });

  it('should update user preferences', async () => {
    const res = await request(app)
      .put('/preferences')
      .set('Authorization', `Bearer ${authToken}`)
      .send({
        categories: ['technology', 'business'],
        languages: ['en', 'es']
      });
    
    expect(res.statusCode).toEqual(200);
    expect(res.body.preferences.categories).toEqual(['technology', 'business']);
  });
});