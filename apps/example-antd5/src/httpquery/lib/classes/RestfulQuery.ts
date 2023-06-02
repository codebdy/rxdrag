import { IQueryReponse, IRestfulDataSource, IRestfulQuery, Unsubscribe } from "../interfaces"

export class RestfulQuery implements IRestfulQuery {
  clearCache(): void {
    throw new Error("Method not implemented.")
  }
  subscribeQuery(dataSouce: IRestfulDataSource, responseOptions: IQueryReponse): Unsubscribe {
    throw new Error("Method not implemented.")
  }
  unsubscribeQuery(key: string): void {
    throw new Error("Method not implemented.")
  }
  save(): void {
    throw new Error("Method not implemented.")
  }

}

export const GlobalQuery = new RestfulQuery()