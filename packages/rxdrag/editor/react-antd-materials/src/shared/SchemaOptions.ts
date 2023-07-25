import { INodeSchema } from "@rxdrag/schema";
import { FieldOptions } from "./createFieldSchema";
import { IComponentEvent } from "./createControllerSchema";
import { IPropSchema } from "./transPropSchemas";

export type SchemaOptions<Field = unknown, ControllerMeta = unknown> = {
  propsSchemas?: IPropSchema<Field, ControllerMeta>[];
  slotsSchemas?: INodeSchema<Field, ControllerMeta>[];
  fieldOptions?: FieldOptions;
  events?: IComponentEvent[];
};
