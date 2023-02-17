import { INodeSchema } from "core";
import { createSchema, SchemaOptions, withFormItem } from "react-shells/ant5/shared/createSchema";
import { IBindParams } from "runner/ComponentRender/interfaces";
import { IFieldMeta } from "runner/fieldy";
import { IControllerMeta } from "runner/reaction";


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
    //需要修改输入控件，数组输入
    {
      componentName: "Input",
      props: {
        placeholdr: "需要替换",
      },
      "x-field": {
        name: "responsive",
        label: "$responsiveBreakpoints",
      },
    },
    {
      componentName: "InputNumber",
      "x-field": {
        name: "width",
        label: "$width",
      },
    },
  ]
}

export const materialSchema: INodeSchema = createSchema(withFormItem(options))