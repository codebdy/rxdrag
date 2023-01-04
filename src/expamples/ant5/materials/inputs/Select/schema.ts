import { INodeSchema } from "core";
import { createSchema } from "react-shells/ant5/shared/createSchema";
import { inputBaseSchemas } from "../schemas";

export const selectSchema: INodeSchema = createSchema([
  ...inputBaseSchemas
])