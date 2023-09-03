import { INodeSchema } from "@rxdrag/schema";
import { SchemaOptions, createSchema } from "../shared";

const scehmaOptions: SchemaOptions = {
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
        label: "$type",
        name: "type",
        defaultValue: "primary",
      }
    },
    {
      componentName: "Switch",
      "x-field": {
        label: "$disabled",
        name: "disabled",
      }
    },
    {
      componentName: "Switch",
      "x-field": {
        label: "$block",
        name: "block",
      }
    },
    {
      componentName: "Switch",
      "x-field": {
        label: "$danger",
        name: "danger",
      }
    },
    {
      componentName: "Switch",
      "x-field": {
        label: "$ghost",
        name: "ghost",
      }
    },

    {
      componentName: "Radio.Group",
      props: {
        optionType: "button",
        size: "small",
        options: [
          {
            label: "$large",
            value: "large"
          },
          {
            label: "$middle",
            value: "middle"
          },
          {
            label: "$small",
            value: "small"
          },
        ],
        defaultValue: "middle",
      },
      "x-field": {
        label: "$size",
        name: "size",
      }
    },
  ],
}

export const schema: INodeSchema = createSchema(scehmaOptions)