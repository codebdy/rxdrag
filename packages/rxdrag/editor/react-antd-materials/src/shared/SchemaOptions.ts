import { INodeSchema } from "@rxdrag/schema";
import { FieldOptions } from "./createFieldSchema";
import { IComponentEvent } from "./createControllerSchema";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type SchemaOptions<IField = any, IReactions = any> = {
  propsSchemas?: INodeSchema<IField, IReactions>[];
  slotsSchemas?: INodeSchema<IField, IReactions>[];
  fieldOptions?: FieldOptions;
  events?: IComponentEvent[];
};
