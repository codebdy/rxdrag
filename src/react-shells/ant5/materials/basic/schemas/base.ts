import { INodeSchema } from "core";

export const baseSchemaChildren = [
  {
    componentName: "FormItem",
    props: {
      label: "ID",
    },
    children: [
      {
        componentName: "Input",
        "x-field": {
          name: "id",
        },
        props: {
          readOnly: true,
        }
      }
    ]
  },
  {
    componentName: "FormItem",
    props: {
      label: "$label",
    },
    children: [
      {
        componentName: "Input",
        "x-field": {
          name: "label",
        },
      }
    ]
  },
]

export const nodeBaseSchema: INodeSchema = {
  componentName: "Fragment",
  children: baseSchemaChildren,
}