import { INodeSchema } from "@rxdrag/schema";
import { SchemaOptions, createSchema } from "../../../shared";

const schemaOptions: SchemaOptions = {
  propSchemas: [
    {
      componentName: "TetradInput",
      props: {
        title: "$padding",
        keys: [
          "pt", "pr", "pl", "pb"
        ],
      },
      "x-field": {
        name: "p",
      }
    },
    {
      componentName: "TetradInput",
      props: {
        title: "$margin",
        keys: [
          "mt", "mr", "ml", "mb"
        ]
      },
      "x-field": {
        name: "m",
      }
    },
  ]
}

export const schema: INodeSchema = createSchema(schemaOptions)