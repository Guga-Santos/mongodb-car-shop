import { expect } from 'chai';
import { Request, Response } from 'express';
import * as sinon from 'sinon';
import { updatedCar } from '../../../../__tests__/utils/CarsMock';

import CarsController from '../../../controllers/Cars';
import Cars from '../../../models/carsModel';
import CarsService from '../../../services/Cars';
import { carMock, carMockWithId, updateCarMock } from '../../mocks/carMock';

describe('Cars Controller', () => {
  const carModel = new Cars()
  const carService = new CarsService(carModel);
  const carController = new CarsController(carService);
 
  const req = {} as Request; 
  const res = {} as Response;

  before(() => {
    sinon.stub(carService, 'create').resolves(carMock);
    sinon.stub(carService, 'readOne').resolves(carMock);
    sinon.stub(carService, 'read').resolves([carMock]);
    sinon.stub(carService, 'update').resolves(updatedCar);

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
  });

  after(() => {
    sinon.restore()
  })

  describe('Create a car', () => {
    it('On success', async () => {
      req.body = carMock;
      await carController.create(req, res);
      expect((res.status as sinon.SinonStub).calledWith(201)).to.be.true;
      expect((res.json as sinon.SinonStub).calledWith(carMock)).to.be.true;
    });
  });

  describe('Read all Cars', () => {
    it('On success', async () => {
      await carController.read(req, res);

      expect((res.status as sinon.SinonStub).calledWith(200)).to.be.true;
      expect((res.json as sinon.SinonStub).calledWith(carMock)).to.be.true;
    });
  });

  describe('ReadOne Car', () => {
    it('On success', async () => {
      req.params = { id: carMockWithId._id };
      await carController.readOne(req, res);

      expect((res.status as sinon.SinonStub).calledWith(200)).to.be.true;
      expect((res.json as sinon.SinonStub).calledWith(carMock)).to.be.true;
    });
  });

  describe('update Car', () => {
    it('On success', async () => {
      req.params = { id: carMockWithId._id };
      req.body = updateCarMock;
      await carController.update(req, res);

      expect((res.status as sinon.SinonStub).calledWith(200)).to.be.true;
      expect((res.json as sinon.SinonStub).calledWith(updatedCar)).to.be.true;
    });
  });
});