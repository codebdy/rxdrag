import { INodeSchema } from "core";
import { createSchema, SchemaOptions, withFormItem } from "react-shells/ant5/shared/createSchema";

const options: SchemaOptions = {
  propsSchemas: [
    {
      componentName: "Input",
      "x-field": {
        name: "title",
        label: "$title",
        params: {
          withBind: true,
        }
      },
    },
    {
      componentName: "Radio.Group",
      "x-field": {
        name: "align",
        label: "$align",
        params: {
          withBind: true,
        }
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
          withBind: true,
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
          withBind: true,
          valuePropName: "checked",
        }
      },
    },
    //需要修改输入控件，数组输入
    {
      componentName: "Input",
      props: {
        name: "responsive",
        placeholdr: "需要替换",
      },
      "x-field": {
        label: "$responsiveBreakpoints",
      },
    },
  ]
}

export const materialSchema: INodeSchema = createSchema(withFormItem(options))