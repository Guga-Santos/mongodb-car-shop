import request from 'supertest';

import connection from '../../src/models/connection';
import { clearDatabase, closeDatabase } from '../utils/db';

import * as carMock from '../utils/CarsMock';

import app from '../../src/app';

describe('09 - Crie uma rota para o endpoint /cars/id onde seja possível listar um único carro através do seu id', () => {
  beforeAll(async () => {
    await connection();
  });

  beforeEach(async () => {
    await clearDatabase();
  });

  afterAll(async () => {
    await closeDatabase();
  });
  it('É possível listar um carro com sucesso através do id', async () => {
    const res = await request(app)
      .post('/cars')
      .send(carMock.validCar)
    const { _id } = res.body;
    const result = await request(app)
      .get(`/cars/${_id}`);
    expect(result.body).toEqual(res.body);
    expect(result.statusCode).toEqual(200);
  });

  it('É disparado o erro 400 "Id must have 24 hexadecimal characters" caso o id possua menos que 24 caracteres', async () => {
    const messageError = {
      error: "Id must have 24 hexadecimal characters",
    };
    const result = await request(app)
      .get('/cars/999');
    expect(result.body).toEqual(messageError);
    expect(result.statusCode).toEqual(400);
  });

  it('É disparado o erro 404 "Object not found" caso o id possua 24 caracteres mas é inválido', async () => {
    const messageError = {
      error: "Object not found",
    };
    const result = await request(app)
      .get('/cars/999999999999999999999999');
    expect(result.body).toEqual(messageError);
    expect(result.statusCode).toEqual(404);
  });
});
