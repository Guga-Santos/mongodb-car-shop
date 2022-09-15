import { Router } from 'express';
import MotorcycleController from '../controllers/Motorcycle';
import Motorcycle from '../models/motorcycleModel';
import MotorcycleService from '../services/Motorcycle';

const route = Router();

const withIdRoute = '/motorcycles/:id';

const motorcycle = new Motorcycle();
const motorcyclesService = new MotorcycleService(motorcycle);
const motorcycleController = new MotorcycleController(motorcyclesService);

route.post('/motorcycles', (req, res) => motorcycleController.create(req, res))
  .get(withIdRoute, (req, res) => motorcycleController.readOne(req, res))
  .get('/motorcycles', (req, res) => motorcycleController.read(req, res))
  .put(withIdRoute, (req, res) => motorcycleController.update(req, res))
  .delete(withIdRoute, (req, res) => motorcycleController.delete(req, res));

export default route;