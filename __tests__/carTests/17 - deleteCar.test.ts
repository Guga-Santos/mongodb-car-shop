import request from 'supertest';

import connection from '../../src/models/connection';
import { clearDatabase, closeDatabase } from '../utils/db';

import * as carMock from '../utils/CarsMock';

import app from '../../src/app';

describe('17 - Crie uma rota para o endpoint /cars/id para excluir os registros de um carro', () => {
  beforeAll(async () => {
    await connection();
  });

  beforeEach(async () => {
    await clearDatabase();
  });

  afterAll(async () => {
    await closeDatabase();
  });

  it('É disparado o erro 404 "Object not found" caso o id possua 24 caracteres mas é inválido', async () => {
    const errorMsg = { error: "Object not found" };
    const response = await request(app)
      .del('/cars/999999999999999999999999')
      .send(carMock.validCar);

    expect(response.status).toBe(404);
    expect(response.body.error).toBe(errorMsg.error);
  });

  it('É disparado o erro 400 "Id must have 24 hexadecimal characters" caso o id possua menos que 24 caracteres', async () => {
    const errorMsg = { error: "Id must have 24 hexadecimal characters" }
    const response = await request(app)
      .del('/cars/99999')
      .send(carMock.validCar);
    expect(response.status).toBe(400);
    expect(response.body.error).toBe(errorMsg.error);
  });

  it('Será verificado que um carro é removido com sucesso', async () => {
    const res = await request(app)
      .post('/cars')
      .send(carMock.validCar)

    const { _id } = res.body;

    const result = await request(app)
      .del(`/cars/${_id}`);

    expect(result.statusCode).toEqual(204);
    expect(result.body).toEqual({});
  })
});
