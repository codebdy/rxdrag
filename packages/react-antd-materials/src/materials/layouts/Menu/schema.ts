import { INodeSchema } from "@rxdrag/schema";


export const menuSchema: INodeSchema = {
  componentName: "Tabs",
  props: {},
  "x-data": {
    type: "object",
    name: "props",
  },
  children: [
    {
      componentName: "Input",
      "x-data": {
        name: "title",
        label: "$title",
      },
    },
    {
      componentName: "Select",
      "x-data": {
        name: "type",
        label: "$type",
      },
      props: {
        options: [
          {
            value: 'primary',
            label: 'Primary',
          },
          {
            value: 'ghost',
            label: 'Ghost',
          },
          {
            value: 'dashed',
            label: 'Dashed',
          },
          {
            value: 'link',
            label: 'Link',
          },
          {
            value: 'text',
            label: 'Text',
          },
          {
            value: 'default',
            label: 'Default',
          },
        ]
      }
    },
    {
      componentName: "Switch",
      "x-data": {
        name: "disabled",
        label: "$disabled",
      },
    },
  ]
}