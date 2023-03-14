import { INodeSchema } from "core";
import { createSchema, SchemaOptions, withFormItem } from "react-shells/ant5/shared/createSchema";
import { typographySchema } from "../schema";

const options: SchemaOptions = {
  propsSchemas: [
    {
      componentName: "Input",
      "x-field": {
        name: "value",
        label: "$content",
        params: {
          withBind: true,
        }
      },
    },
    {
      componentName: "Select",
      "x-field": {
        name: "level",
        label: "$level",
        params: {
          withBind: true,
        }
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
  logicOptions: {
    canBindField: true,
  }
}

export const schema: INodeSchema = createSchema(withFormItem(options))