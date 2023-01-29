import { INodeSchema } from "core";
import { createSchema, SchemaOptions } from "react-shells/ant5/shared/createSchema";
import { IBindParams } from "runner/ComponentRender/interfaces";
import { IFieldMeta } from "runner/fieldy";
import { IControllerMeta } from "runner/reaction/interfaces/metas";

const options: SchemaOptions<IFieldMeta<IBindParams>, IControllerMeta> = {
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
  logicOptions: {
    canBindField: true,
  }
}

export const materialSchema: INodeSchema = createSchema(options)