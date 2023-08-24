import { AxiosRequestConfig } from 'axios';

export interface IQueryParam {
  //参数转换成的字符串，作为请求url的一部分或者全部
  url?: string,
  axiosConfig?: AxiosRequestConfig,
  entityName?: string;
  dataPath?: string;
  idField?: string;
}

export interface IPostParam {
  url?: string,
  axiosConfig?: AxiosRequestConfig,
  entityName?: string;
  data?: unknown;
}

export interface IResponseHandler {
  onError?(error?: Error): void,
  onData?(data?: unknown): void,
  onLoading?(loading?: boolean): void,
  onRevalidating?(revalidating?: boolean): void,
}

export interface IRestfulQuerySession {
  query(param: string, responseOptions: IResponseHandler): void;
  destroy(): void;
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