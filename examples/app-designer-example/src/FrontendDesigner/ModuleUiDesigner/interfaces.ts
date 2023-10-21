import { IValidateSchema } from "@rxdrag/fieldy";
import { ID } from "@rxdrag/shared";

export enum ModelType {
  Entity = "Entity",
  Property = "Property"
}

//字段元数据
export interface IModelMeta<ValidateRules extends IValidateSchema = IValidateSchema> {
  type: ModelType;
  modelId: ID;
  //name?: string;
  defaultValue?: unknown;
  //校验规则
  validateRules?: ValidateRules;
}
