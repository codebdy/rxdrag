import { DataSouceType, IQueryConfig, IRestfulDataSource } from "../interfaces";
import { DataSource1, IDataSouce1Config } from "./datasource1";
import { DataSource2, IDataSouce2Config } from "./datasource2";

//这只是演示，如果正式项目的数据源类型多的话，可以考虑使用反射，或者动态管理数据源
export const DataSouceFactory = (config: IQueryConfig): IRestfulDataSource | undefined => {
  if (config.dataSourceType === DataSouceType.DataSource1) {
    return new DataSource1(config.dataSourceParam as IDataSouce1Config)
  }
  if (config.dataSourceType === DataSouceType.DataSource2) {
    return new DataSource2(config.dataSourceParam as IDataSouce2Config)
  }
  return undefined
}