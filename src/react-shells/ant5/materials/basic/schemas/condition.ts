import { INodeSchema } from "core";
import { labelSchema } from "./base";

export const conditionSchema: INodeSchema = {
  componentName: "Fragment",
  children: [
    labelSchema,
  ],
}