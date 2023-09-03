import { INodeSchema } from "@rxdrag/schema";
import { SchemaOptions, createSchema } from "../shared";

const scehmaOptions: SchemaOptions = {
  noStyle: true,
  propSchemas: [
    {
      componentName: "Radio.Group",
      props: {
        optionType: "button",
        size: "small",
        options: [
          {
            label: "$dark",
            value: "dark"
          },
          {
            label: "$light",
            value: "light"
          },
        ],
        defaultValue: "dark",
      },

      "x-field": {
        label: "$themeMode",
        name: "themeMode",
      }
    },
    {
      componentName: "Select",
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
      },
      "x-field": {
        label: "$themeColor",
        name: "themeColor",
      }
    },
    {
      componentName: "Switch",
      "x-field": {
        label: "$backgroundImage",
        name: "backgroundImage",
      }
    },
  ],
}

export const schema: INodeSchema = createSchema(scehmaOptions)