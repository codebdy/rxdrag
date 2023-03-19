import { INodeSchema } from "core";
import { createSchema, SchemaOptions, withFormItem } from "react-shells/ant5/shared/createSchema";
import { IBindParams } from "runner/ComponentRender/interfaces";
import { IFieldMeta } from "runner/fieldy";
import { IControllerMeta } from "runner/minions/interfaces/metas";

const options: SchemaOptions<IFieldMeta<IBindParams>, IControllerMeta> = {
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
  logicOptions: {
    canBindField: true,
  }
}

export const materialSchema: INodeSchema = createSchema(withFormItem(options))