import { INodeSchema } from "@rxdrag/schema";
import { createSchema, createSlotsSchema, SchemaOptions, withFormItem } from "@rxdrag/react-antd-shell";

const options: SchemaOptions = {
  propsSchemas: [
    {
      componentName: "Input",
      "x-field": {
        name: "value",
        label: "$content",
      },
    },
    {
      componentName: "Switch",
      "x-field": {
        name: "closable",
        label: "$closable",
        params: {
          valuePropName: "checked",
        }
      },
    },
    {
      componentName: "TagColorInput",
      "x-field": {
        name: "color",
        label: "$color",
      },
    },
  ],
  slotsSchemas: createSlotsSchema(
    {
      name: "icon",
      label: "$icon"
    }
  ),
  logicOptions: {
    canBindField: true,
  }
}

export const schema: INodeSchema = createSchema(withFormItem(options))