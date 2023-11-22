import { IFieldMeta, IValidateSchema } from "@rxdrag/fieldy";
import { ID } from "@rxdrag/shared";


export enum ModelType {
  //实体
  Entity = "Entity",
  //属性
  Attribute = "Attribute",
  //关联
  Association = "Association"
}

//字段元数据
export interface IModelMeta<ValidateRules extends IValidateSchema = IValidateSchema> extends IFieldMeta<ValidateRules> {
  //数据类型
  modelType?: ModelType | null;
  //实体或者属性ID
  modelMetaId?: ID | null;
}
