import { INodeSchema } from "@rxdrag/schema";
import { SchemaOptions, createSchema, createSlotsSchema } from "../../shared";
import { IFieldMeta } from "@rxdrag/fieldy-schema"
import { ILogicFlowControllerMeta } from "@rxdrag/minions-runtime-react";

const scehmaOptions: SchemaOptions<IFieldMeta, ILogicFlowControllerMeta> = {
  propsSchemas: [
    {
      label: "$title",
      name: "title",
      setter: {
        componentName: "Input",
      },
    },
    {
      label: "$type",
      name: "type",
      defaultValue: "primary",
      setter: {
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
        }
      },
    },
    {
      label: "$disabled",
      name: "disabled",
      setter: {
        componentName: "Switch",
      },
    },
    {
      label: "$block",
      name: "block",
      setter: {
        componentName: "Switch",
      },
    },
    {
      label: "$danger",
      name: "danger",
      setter: {
        componentName: "Switch",
      },
    },
    {
      label: "$ghost",
      name: "ghost",
      setter: {
        componentName: "Switch",
      },
    },
    {
      label: "$shape",
      name: "shape",
      setter: {
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
        }
      },
    },
    {
      label: "$size",
      name: "size",
      setter: {
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
        }
      },
    },
  ],
  slotsSchemas: createSlotsSchema(
    {
      name: "icon",
      label: "$icon"
    }
  ),
  events: [
    {
      name: "onClick",
      label: "$onClick",
    }
  ],
}

export const buttonSchema: INodeSchema = createSchema(scehmaOptions)