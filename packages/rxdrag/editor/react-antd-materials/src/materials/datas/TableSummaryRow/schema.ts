import { IBindParams } from "@rxdrag/react-runner";
import { INodeSchema } from "@rxdrag/schema";
import { SchemaOptions, createSchema } from "../../../shared";
import { IFieldMeta } from "@rxdrag/fieldy-schema";
import { ILogicFlowControllerMeta } from "@rxdrag/minions-runtime-react";

const options: SchemaOptions<IFieldMeta<IBindParams>, ILogicFlowControllerMeta> = {
  propsSchemas: [
    {
      componentName: "FormItem",
      props: {
        label: "$bordered",
      },
      children: [
        {
          componentName: "Switch",
          "x-field": {
            name: "bordered",
            params: {
              valuePropName: "checked",
              withBind: true,
            }
          },
        }
      ],
    },
    {
      componentName: "FormItem",
      props: {
        label: "$split",
      },
      children: [
        {
          componentName: "Switch",
          "x-field": {
            name: "split",
            params: {
              valuePropName: "checked",
              withBind: true,
            }
          },
        }
      ],
    },
    {
      componentName: "FormItem",
      props: {
        label: "$size",
      },
      children: [
        {
          componentName: "Radio.Group",
          "x-field": {
            name: "size",
            params: {
              withBind: true,
            }
          },
          props: {
            optionType: "button",
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
        }
      ]
    }
  ],
  slotsSchemas: [
    {
      componentName: "FormItem",
      props: {
        label: "$header",
      },
      children: [
        {
          componentName: "SlotSwitch",
          props: {
            name: "header"
          }
        },
      ]
    },
    {
      componentName: "FormItem",
      props: {
        label: "$footer",
      },
      children: [
        {
          componentName: "SlotSwitch",
          props: {
            name: "footer"
          }
        },
      ]
    },
  ],
  fieldOptions: {
    canBindField: true,
  }
}

export const materialSchema: INodeSchema = createSchema(options)