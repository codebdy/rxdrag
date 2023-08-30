import { INodeSchema } from "@rxdrag/schema";

export interface ISchemaFragment {
  title: string,
  rootComponentName: string,
  schema?: INodeSchema,
}
