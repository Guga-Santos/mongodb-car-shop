import request from 'supertest';

import connection from '../../src/models/connection';
import { clearDatabase, closeDatabase } from '../utils/db';

import * as motorcycleMock from '../utils/MotorcyclesMock';

import app from '../../src/app';

describe('20 - Crie uma rota para o endpoint /motorcycles onde seja possível listar todas as motos registradas', () => {
  beforeAll(async () => {
    await connection();
  });

  beforeEach(async () => {
    await clearDatabase();
  });

  afterAll(async () => {
    await closeDatabase();
  });

  it('É possível listar as motos com sucesso', async () => {
    const res = await request(app)
      .post('/motorcycles')
      .send(motorcycleMock.validMotorcycle)
    const result = await request(app)
      .get('/motorcycles');
    expect(result.body).toEqual([res.body]);
    expect(result.statusCode).toEqual(200);
  });

  it('Retorna uma lista vazia se não houver motos', async () => {
    const result = await request(app)
      .get('/motorcycles');
    expect(result.body).toEqual([]);
    expect(result.statusCode).toEqual(200);
  });
});
