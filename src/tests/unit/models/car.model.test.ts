import { expect } from 'chai';
import { Model } from 'mongoose';
import sinon from 'sinon';
import Cars from '../../../models/carsModel';
import { carMock, carMockWithId } from '../../mocks/carMock';

describe('Cars Model', () => {
  const carModel = new Cars();

	before(() => {
		sinon.stub(Model, 'create').resolves(carMockWithId);
		sinon.stub(Model, 'findOne').resolves(carMockWithId);
	});

	after(() => {
		sinon.restore();
	});

  describe('ensure a car is create', () => {
		it('successfully created', async () => {
			const newFrame = await carModel.create(carMock);
			expect(newFrame).to.be.deep.equal(carMockWithId);
		});
	});

	describe('ensure its possible to find a car', () => {
		it('successfully found', async () => {
			const framesFound = await carModel.readOne('4edd40c86762e0fb12000003');
			expect(framesFound).to.be.deep.equal(carMockWithId);
		});

		it('_id not found', async () => {
			try {
				await carModel.readOne('Wrong_id');
			} catch (error: any) {
				expect(error.message).to.be.eq('InvalidMongoId');
			}
		});
	});

});