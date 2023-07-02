import { IBindParams } from "@rxdrag/react-runner";
import { INodeSchema } from "@rxdrag/schema";
import { SchemaOptions, createSchema, withFormItem } from "../../../shared";
import { IFieldMeta } from "@rxdrag/fieldy-schema";
import { ILogicFlowControllerMeta } from "@rxdrag/minions-runtime-react";

const options: SchemaOptions<IFieldMeta<IBindParams>, ILogicFlowControllerMeta> = {
  propsSchemas: [
    {
      componentName: "Switch",
      "x-field": {
        name: "bordered",
        label: "$bordered",
        params: {
          valuePropName: "checked",
        }
      },
    },
    {
      componentName: "Radio.Group",
      "x-field": {
        name: "size",
        label: "$size",
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
    },
  ],
  slotsSchemas: [
    {
      componentName: "SlotSwitch",
      props: {
        name: "header"
      },
      "x-field": {
        label: "$header",
      }
    },
    {
      componentName: "SlotSwitch",
      props: {
        name: "footer"
      },
      "x-field": {
        label: "$footer",
      }
    },
  ],
  fieldOptions: {
    canBindField: true,
  }
}

export const materialSchema: INodeSchema = createSchema(withFormItem(options))