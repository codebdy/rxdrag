import { INodeSchema } from "core";
import { createSchema, SchemaOptions } from "react-shells/ant5/shared/createSchema";

const options: SchemaOptions = {
  propsSchemas: [
    {
      componentName: "FormItem",
      props: {
        label: "$title",
      },
      children: [
        {
          componentName: "Input",
          "x-field": {
            name: "title",
            params: {
              withBind: true,
            }
          },
        }
      ]
    },
    {
      componentName: "FormItem",
      props: {
        label: "$value",
      },
      children: [
        {
          componentName: "Input",
          "x-field": {
            name: "value",
            params: {
              withBind: true,
            }
          },
        }
      ]
    },
    {
      componentName: "FormItem",
      props: {
        label: "$prefix",
      },
      children: [
        {
          componentName: "IconInput",
          "x-field": {
            name: "prefix",
            params: {
              withBind: true,
            }
          },
        }
      ]
    },
  ]
}

export const staticSchema: INodeSchema = createSchema(options)