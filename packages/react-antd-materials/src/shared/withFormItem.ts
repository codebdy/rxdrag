import { SchemaOptions } from "./SchemaOptions";
import { attachFormItem } from "./attachFormItem";


export function withFormItem(options: SchemaOptions = {}) {
  return {
    ...options,
    propsSchemas: attachFormItem(options.propsSchemas),
    slotsSchemas: attachFormItem(options.slotsSchemas),
  };
}
