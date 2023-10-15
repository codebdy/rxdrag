import { ISlotSchema } from "./transSlotSchemas";
import { INodeSchema } from "@rxdrag/schema";
import { IFieldMeta } from "@rxdrag/fieldy";
import { IControllerMeta } from "@rxdrag/minions-runtime-react";

export type FieldOptions = {
  hasField?: boolean,
  hasRules?: boolean,
}

export type SchemaOptions = {
  propSchemas?: INodeSchema<IFieldMeta, IControllerMeta>[];
  slotSchemas?: ISlotSchema[];
  field?: FieldOptions;
};
