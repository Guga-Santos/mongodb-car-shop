interface IService<T> {
  create(obj:unknown):Promise<T>,
  read():Promise<T[] | null>
  readOne(_id:string):Promise<T>,
}

export default IService;