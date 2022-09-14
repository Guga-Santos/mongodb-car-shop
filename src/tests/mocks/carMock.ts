import { ICar } from "../../interfaces/ICar";

const carMockWithId: ICar & { _id: string} = {
  _id: "4edd40c86762e0fb12000003",
  model: "Ferrari Maranello",
  year: 1963,
  color: "red",
  buyValue: 3500000,
  seatsQty: 2,
  doorsQty: 2
}

const carMock: ICar = {
  model: "Ferrari Maranello",
  year: 1963,
  color: "red",
  buyValue: 3500000,
  seatsQty: 2,
  doorsQty: 2
}

const updateCarMock: Partial<ICar> = {
  year: 1964,
  color: "yellow",
}

const updatedMock: ICar & { _id: string} = {
  _id: "4edd40c86762e0fb12000003",
  model: "Ferrari Maranello",
  year: 1964,
  color: "yellow",
  buyValue: 3500000,
  seatsQty: 2,
  doorsQty: 2
}

export { carMock, carMockWithId, updateCarMock, updatedMock };
