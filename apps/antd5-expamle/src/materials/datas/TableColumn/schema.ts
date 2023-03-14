import { INodeSchema } from "core";
import { createSchema, SchemaOptions, withFormItem } from "react-shells/ant5/shared/createSchema";
import { IBindParams } from "runner/ComponentRender/interfaces";
import { IFieldMeta } from "runner/fieldy";
import { IControllerMeta } from "runner/minions";


const options: SchemaOptions<IFieldMeta<IBindParams>, IControllerMeta> = {
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
  logicOptions: {
    canBindField: true,
  }
}

export const materialSchema: INodeSchema = createSchema(withFormItem(options))