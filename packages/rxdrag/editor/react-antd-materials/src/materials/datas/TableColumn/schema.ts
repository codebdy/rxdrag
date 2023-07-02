import { IBindParams } from "@rxdrag/react-runner";
import { INodeSchema } from "@rxdrag/schema";
import { createSchema, SchemaOptions, withFormItem } from "../../../shared";
import { IFieldMeta } from "@rxdrag/fieldy-schema";
import { ILogicFlowControllerMeta } from "@rxdrag/minions-runtime-react";

const options: SchemaOptions<IFieldMeta<IBindParams>, ILogicFlowControllerMeta> = {
  propsSchemas: [
    {
      componentName: "Input",
      "x-field": {
        name: "title",
        label: "$title",
      },
    },
    {
      componentName: "Radio.Group",
      "x-field": {
        name: "align",
        label: "$align",
      },
      props: {
        optionType: "button",
        options: [
          {
            label: "$left",
            value: "left"
          },
          {
            label: "$center",
            value: "center"
          },
          {
            label: "$right",
            value: "right"
          },
        ],
        defaultValue: "left",
      }
    },
    {
      componentName: "Switch",
      "x-field": {
        name: "ellipsis",
        label: "$ellipsis",
        params: {
          valuePropName: "checked",
        }
      },
    },
    {
      componentName: "Switch",
      "x-field": {
        name: "fixed",
        label: "$fixed",
        params: {
          valuePropName: "checked",
        }
      },
    },
    {
      componentName: "CheckboxGroup",
      "x-field": {
        name: "responsive",
        label: "$responsiveBreakpoints",
      },
      props: {
        options: [
          {
            label: "xxl",
            value: "xxl"
          },
          {
            label: "xl",
            value: "xl"
          },
          {
            label: "lg",
            value: "lg"
          },
          {
            label: "md",
            value: "md"
          },
          {
            label: "sm",
            value: "sm"
          },
          {
            label: "xs",
            value: "xs"
          },
        ],
      }
    },
    {
      componentName: "InputNumber",
      "x-field": {
        name: "width",
        label: "$width",
      },
    },
  ],
  fieldOptions: {
    canBindField: true,
  }
}

export const materialSchema: INodeSchema = createSchema(withFormItem(options))