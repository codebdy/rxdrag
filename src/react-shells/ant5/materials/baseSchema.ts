import { INodeSchema } from "core";

export const labelSchema = {
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
}

export const nameSchema = {
  componentName: "FormItem",
  props: {
    label: "$name",
  },
  children: [
    {
      componentName: "Input",
      "x-field": {
        name: "name",
      },
    }
  ]
}

export const startEndSchema: INodeSchema = {
  componentName: "Fragment",
  children: [nameSchema, labelSchema],
}

export const nodeBaseSchema: INodeSchema = {
  componentName: "Fragment",
  children: [labelSchema],
}