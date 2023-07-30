import { INodeSchema } from "@rxdrag/schema";
import { SchemaOptions, createSchema } from "../../../../shared";
import { typographySchema } from "../schema";

const options: SchemaOptions = {
  propSchemas: [
    {
      componentName: "Input",
      "x-field": {
        name: "value",
        label: "$content",
      },
    },
    {
      componentName: "Select",
      "x-field": {
        name: "level",
        label: "$level",
      },
      props: {
        options: [
          {
            label: "H1",
            value: 1
          },
          {
            label: "H2",
            value: 2
          },
          {
            label: "H3",
            value: 3
          },
          {
            label: "H4",
            value: 4
          },
          {
            label: "H5",
            value: 5
          },
        ],
        defaultValue: 1,
      }
    },
    ...typographySchema,
  ],
  canBindField: true,
}

export const schema: INodeSchema = createSchema(options)