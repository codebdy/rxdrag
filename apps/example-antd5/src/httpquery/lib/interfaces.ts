export interface IRestfulDataSource {
  entityName?: string;
  idColumn?: string;
  getUrl(): string,
  getRequest(): RequestInit,
  toKey(): string,
}

export interface IQueryReponse {
  onError(): void,
  onComplate(): void,
}

export type Unsubscribe = () => void
export type QueryCallback = () => void

export interface IRestfulQuery {
  clearCache(): void;

  subscribeQuery(dataSouce: IRestfulDataSource, responseOptions: IQueryReponse): Unsubscribe;

  unsubscribeQuery(key: string): void;

  save(): void;
}