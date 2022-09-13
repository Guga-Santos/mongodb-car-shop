import request from 'supertest';

import connection from '../../src/models/connection';
import { clearDatabase, closeDatabase } from '../utils/db';

import * as carMock from '../utils/CarsMock';

import app from '../../src/app';

describe('08 - Crie uma rota para o endpoint /cars onde seja possível listar todos os carros registrados', () => {
  beforeAll(async () => {
    await connection();
  });

  beforeEach(async () => {
    await clearDatabase();
  });

  afterAll(async () => {
    await closeDatabase();
  });

  it('É possível listar os carros com sucesso', async () => {
    const res = await request(app)
      .post('/cars')
      .send(carMock.validCar)
    const result = await request(app)
      .get('/cars');
    expect(result.body).toEqual([res.body]);
    expect(result.statusCode).toEqual(200);
  });

  it('Retorna uma lista vazia se não houver carros', async () => {
    const result = await request(app)
      .get('/cars');
    expect(result.body).toEqual([]);
    expect(result.statusCode).toEqual(200);
  });
});
