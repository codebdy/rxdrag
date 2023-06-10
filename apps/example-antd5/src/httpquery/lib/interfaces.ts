import { AxiosRequestConfig } from 'axios';

export interface IQueryParam {
  //参数转换成的字符串，作为请求url的一部分或者全部
  url?: string,
  axiosConfig?: AxiosRequestConfig,
  entity?: string;
  dataPath?: string;
  idField?: string;
}

export interface IPostParam {
  url?: string,
  axiosConfig?: AxiosRequestConfig,
  entity?: string;
  data?: unknown;
}

export interface IReponseHandler {
  onError?(error?: Error): void,
  onData?(data?: unknown): void,
  onLoading?(loading?: boolean): void,
  onRevalidating?(revalidating?: boolean): void,
}

export interface IRestfulQuerySession {
  query(param: IQueryParam, responseOptions: IReponseHandler): void;
  destory(): void;
}


export type Unsubscribe = () => void
export type QueryCallback = () => void

export interface IQueryConfig {
  rootUrl?: string;
  entityName?: string;
  requestInit?: RequestInit;
  dataPath?: string;
  idName?: string;
}


export interface IPostConfig{
  rootUrl?: string;
  entityName?: string;
  requestInit?: RequestInit;
  dataPath?: string;
}