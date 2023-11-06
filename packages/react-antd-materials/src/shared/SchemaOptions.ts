import { ISlotSchema } from "./transSlotSchemas";
import { INodeSchema } from "@rxdrag/schema";
import { FieldType, IFieldMeta } from "@rxdrag/fieldy";
import { ControllerScopeType, IControllerMeta } from "@rxdrag/minions-runtime-react";

export type FieldOptions = {
  hasRules?: boolean,
  fieldType?: FieldType,
  hasLabel?: boolean,
  hasDefaultValue?: boolean,
}

export type SchemaOptions = {
  propSchemas?: INodeSchema<IFieldMeta, IControllerMeta>[];
  slotSchemas?: ISlotSchema[];
  field?: FieldOptions;
  ctrlScopeType?: ControllerScopeType
};
