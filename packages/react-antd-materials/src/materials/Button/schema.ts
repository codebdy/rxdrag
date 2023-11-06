import { INodeSchema } from "@rxdrag/schema";
import { SchemaOptions, createSchema } from "../../shared";

const schemaOptions: SchemaOptions = {
  propSchemas: [
    {
      componentName: "Input",
      props: {
        allowClear: true,
      },
      "x-data": {
        label: "$title",
        name: "title",
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
      "x-data": {
        label: "$type",
        name: "type",
        defaultValue: "primary",
      }
    },
    {
      componentName: "Switch",
      "x-data": {
        label: "$disabled",
        name: "disabled",
      }
    },
    {
      componentName: "Switch",
      "x-data": {
        label: "$block",
        name: "block",
      }
    },
    {
      componentName: "Switch",
      "x-data": {
        label: "$danger",
        name: "danger",
      }
    },
    {
      componentName: "Switch",
      "x-data": {
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
            label: "$default",
            value: "default"
          },
          {
            label: "$circle",
            value: "circle"
          },
          {
            label: "$round",
            value: "round"
          },
        ],
        defaultValue: "default",
      },
      "x-data": {
        label: "$shape",
        name: "shape",
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
      "x-data": {
        label: "$size",
        name: "size",
      }
    },
  ],
  slotSchemas: [
    {
      name: "icon",
      label: "$icon"
    }
  ],
}

export const buttonSchema: INodeSchema = createSchema(schemaOptions)