import { DataQueryType, IQueryConfig, IRestfulQuerySession } from "../interfaces";
import { QuerySession1, IDataSouce1Config } from "./QuerySession1";
import { DataSource2, IDataSouce2Config } from "./datasource2";

// 这只是演示，目的是抛砖引玉
// 如果正式项目的数据源类型多的话，可以考虑使用反射，或者动态管理数据源
export const DataSouceFactory = (config: IQueryConfig): IRestfulQuerySession | undefined => {
  if (config.dataQueryType === DataQueryType.DataQuery1) {
    return new QuerySession1(config.dataQueryParam as IDataSouce1Config)
  }
  if (config.dataQueryType === DataQueryType.DataQuery2) {
    return new DataSource2(config.dataQueryParam as IDataSouce2Config)
  }
  return undefined
}