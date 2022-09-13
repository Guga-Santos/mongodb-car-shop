import { IModel } from "../../../src/interfaces/IModel";

type testModel = { test: string }

class TestModel implements IModel<testModel> {
  create = async (obj: testModel): Promise<testModel> =>
    new Promise<testModel>((resolve) => resolve(obj));

  read = async (): Promise<testModel[]> =>
    new Promise<testModel[]>((resolve) =>
      resolve([{ test: 'teste1' }, { test: 'teste2' }, { test: 'teste3' }]));

  readOne = async (_id_: string): Promise<testModel | null> =>
    new Promise<testModel>((resolve) => resolve({ test: 'teste' }));

  update = async (_id_: string, obj: testModel): Promise<testModel | null> =>
    new Promise<testModel>((resolve) => resolve(obj));

  delete = async (_id_: string): Promise<testModel | null> =>
    new Promise<testModel>((resolve) => resolve({ test: 'teste' }));
}
