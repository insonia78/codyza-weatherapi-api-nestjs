import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { App } from 'supertest/types';
import { AppModule } from './../src/app.module.js';

describe('AppController (e2e)', () => {
  let app: INestApplication<App>;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.setGlobalPrefix('api');
    await app.init();
  });

  it('/api (GET)', () => {
    return request(app.getHttpServer())
      .get('/api')
      .expect(200)
      .expect('Codyza Weather API');
  });

  it('/api/weather/status (GET)', () => {
    return request(app.getHttpServer())
      .get('/api/weather/status')
      .expect(200)
      .expect(({ body }) => {
        expect(body.providerName).toBe('Google Maps Weather API');
        expect(typeof body.configured).toBe('boolean');
      });
  });

  afterEach(async () => {
    await app.close();
  });
});
