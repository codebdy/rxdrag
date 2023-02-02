import { INodeSchema } from "core";
import { baseSchemaChildren } from "./base";

export const conditionSchema: INodeSchema = {
  componentName: "Fragment",
  children: [
    ...baseSchemaChildren,
  ],
}