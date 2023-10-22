import { ISlotSchema } from "./transSlotSchemas";
import { INodeSchema } from "@rxdrag/schema";
import { FieldType, IFieldMeta } from "@rxdrag/fieldy";
import { IControllerMeta } from "@rxdrag/minions-runtime-react";

export type FieldOptions = {
  hasRules?: boolean,
  fieldType?: FieldType,
}

export type SchemaOptions = {
  propSchemas?: INodeSchema<IFieldMeta, IControllerMeta>[];
  slotSchemas?: ISlotSchema[];
  field?: FieldOptions;
};
