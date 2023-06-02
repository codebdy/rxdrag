export interface IRestfulDataSource<Param = unknown> {
  init(param: Param): void;
  entityName?: string;
  idColumn?: string;
  //同时作为缓存key
  toUrl(): string;
  //请求参数
  getRequestInit(): RequestInit | undefined;
  //点号分割的数据path，用于获取列表数据或者实体数据
  dataPath?: string;
}


export interface IQueryReponse {
  onError?(error?: Error): void,
  onComplate?(data?: unknown): void,
  onLoading?(loading?: boolean): void,
  revalidating?(revalidating?: boolean): void,
}

export type Unsubscribe = () => void
export type QueryCallback = () => void

export interface IRestfulQuery {
  clearCache(): void;
  subscribeQuery(dataSouce: IRestfulDataSource, responseOptions: IQueryReponse): Unsubscribe;
  unsubscribeQuery(url: string): void;
  save(): void;
}

export enum DataSouceType {
  DataSource1 = "dataSource1",
  DataSource2 = "dataSource2",
}

//根据需要，自定义配置样式
export interface IQueryConfig<T = unknown> {
  //用来识别使用哪个数据源
  dataSourceType: DataSouceType;
  dataSourceParam?: T;
}

