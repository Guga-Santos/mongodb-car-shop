import { expect } from 'chai';
import { Model } from 'mongoose';
import sinon from 'sinon';
import Cars from '../../../models/carsModel';
import {
	carMock,
	carMockWithId,
	updateCarMock,
	updatedMock
} from '../../mocks/carMock';

describe('Cars Model', () => {
  const carModel = new Cars();

	before(() => {
		sinon.stub(Model, 'create').resolves(carMockWithId);
		sinon.stub(Model, 'find').resolves([carMockWithId]);
		sinon.stub(Model, 'findOne').resolves(carMockWithId);
		sinon.stub(Model, 'findOneAndUpdate').resolves(updatedMock);
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

	describe('ensure its possible to find all cars', () => {
		it('successfully found', async () => {
			const framesFound = await carModel.read();
			expect(framesFound).to.be.deep.equal([carMockWithId]);
		});
	});

	describe('ensure its possible to find a car', () => {
		it('successfully found', async () => {
			const framesFound = await carModel.readOne(carMockWithId._id);
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

	describe('ensure its possible to update a car', () => {
		it('successfully found', async () => {
			const framesFound = await carModel.update(carMockWithId._id, updateCarMock );
			expect(framesFound).to.be.deep.equal(updatedMock);
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