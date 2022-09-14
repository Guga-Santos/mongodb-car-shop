import { Router } from 'express';
import CarsController from '../controllers/Cars';
import Cars from '../models/carsModel';
import CarsService from '../services/Cars';

const route = Router();

const car = new Cars();
const carService = new CarsService(car);
const carController = new CarsController(carService);

route.post('/cars', (req, res) => carController.create(req, res));
route.get('/cars/:id', (req, res) => carController.readOne(req, res));

export default route;