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
          },
        }
      ]
    },
  ]
}

export const staticSchema: INodeSchema = createSchema(options)