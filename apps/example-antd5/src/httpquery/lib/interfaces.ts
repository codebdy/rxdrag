export interface IQueryParam {
  //参数转换成的字符串，作为请求url的一部分或者全部
  url?: string,
  requestInit?: RequestInit,
  entity?: string;
  dataPath?: string;
  idField?: string;
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

export interface IRestfulQuery {
  clearCache(): void;
  subscribeQuery(param: IQueryParam, responseHandler: IReponseHandler): Unsubscribe;
  unsubscribeQuery(url: string, handler: IReponseHandler): void;
  save(): void;
}

export enum DataQueryType {
  DataQuery1 = "dataQuery1",
  DataQuery2 = "dataQuery2",
}

//根据需要，自定义配置样式
export interface IQueryConfig<T = unknown> {
  //用来识别使用哪个数据源
  dataQueryType: DataQueryType;
  dataQueryParam?: T;
}

