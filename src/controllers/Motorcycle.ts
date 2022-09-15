import { Request, Response } from 'express';
import { IMotorcycle } from '../interfaces/IMotorcycle';
import IService from '../interfaces/IService';

export default class MotorcycleController {
  constructor(private _service: IService<IMotorcycle>) {}

  public async create(req: Request, res: Response) {
    const { body } = req;
    const newMotorcycle = await this._service.create(body);
    return res.status(201).json(newMotorcycle);
  }

  public async read(req: Request, res: Response) {
    const motorcycles = await this._service.read();
    return res.status(200).json(motorcycles);
  }

  public async readOne(req: Request, res: Response) {
    const { id } = req.params;
    const motorcycles = await this._service.readOne(id);
    return res.status(200).json(motorcycles);
  }

  public async update(req: Request, res: Response) {
    const { id } = req.params;
    const { body } = req;
    const motorcycles = await this._service.update(id, body);
    return res.status(200).json(motorcycles);
  }

  public async delete(req: Request, res: Response) {
    const { id } = req.params;
    await this._service.delete(id);
    return res.status(204).end();
  }
}