import { INodeSchema } from "@rxdrag/schema";
import { SchemaOptions, createSchema } from "../../shared";

const scehmaOptions: SchemaOptions = {
  props: [
    {
      componentName: "Input",
      "x-field": {
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
      "x-field": {
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
      "x-field": {
        label: "$size",
        name: "size",
      }
    },
  ],
  slots: [
    {
      name: "icon",
      label: "$icon"
    }
  ],
  events: [
    {
      name: "onClick",
      label: "$onClick",
    }
  ],
}

export const buttonSchema: INodeSchema = createSchema(scehmaOptions)