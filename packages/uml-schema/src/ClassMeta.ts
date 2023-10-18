import { AttributeMeta } from "./AttributeMeta";

/**
 * 实体类型枚举
 * 枚举实体类似语法糖，不映射数据库，
 * 枚举类型的字段映射到数据库是string类型
 */
export enum StereoType {
  Enum = "Enum",
  //Interface = "Interface",
  Abstract = "Abstract",
  ValueObject = "ValueObject",
  Entity = "Entity",
  Service = "Service",
  ThirdParty = "ThirdParty"
  //GQLInterface = "GQLInterface",
  //Association = "Association",
  //External = "External",//外部实体
  //Partial = "Partial"
}

/**
 * 实体元数据
 */
export interface ClassMeta {
  /**
   * 唯一标识
   */
  uuid: string;

  innerId: number;

  name: string;

  label?: string;

  stereoType: StereoType;
  attributes: AttributeMeta[];
  //methods: MethodMeta[];

  root?: boolean;
  packageUuid: string;
  description?: string;
  system?: boolean;
  //id不转换，直接从1开始计数，用于App类
  idNoShift?: boolean;
  onCreated?: string;
  onUpdated?: string;
  onDeleted?: string;
}
