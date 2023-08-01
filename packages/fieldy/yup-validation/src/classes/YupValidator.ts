import { IFieldSchema, IValidator } from "@rxdrag/fieldy";
import { YupValidateRules } from "../interfaces";

export class YupValidator implements IValidator<YupValidateRules>{
  
  validateForm(value: unknown, fieldSchemas: IFieldSchema<YupValidateRules>[]): Promise<unknown> {
    throw new Error("Method not implemented.");
  }
  validateField(value: unknown, fiesdSchema: IFieldSchema<YupValidateRules>, subFieldSchemas?: IFieldSchema<YupValidateRules>[] | undefined): Promise<unknown> {
    throw new Error("Method not implemented.");
  }
  
}