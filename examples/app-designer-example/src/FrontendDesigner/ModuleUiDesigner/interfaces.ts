import { FieldType, IValidateSchema } from "@rxdrag/fieldy";
import { ID } from "@rxdrag/shared";

export enum ModelType {
  //实体
  Entity = "Entity",
  //性质：属性、关联
  Property = "Property"
}

//字段元数据
export interface IModelMeta<ValidateRules extends IValidateSchema = IValidateSchema> {
  //数据类型
  type?: ModelType | null;
  //实体或者属性ID
  modelMetaId?: ID | null;
  //默认值
  defaultValue?: unknown;
  //校验规则
  validateRules?: ValidateRules | null;
  //自定义
  customizedName?: string | null;
  //自定义时使用
  fieldType?: FieldType | null,
}
