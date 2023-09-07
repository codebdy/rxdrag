import { IFieldMeta } from "@rxdrag/fieldy";
import { ILogicFlowControllerMeta } from "@rxdrag/minions-runtime-react";
import { INodeSchema } from "@rxdrag/schema";


export interface IPropSchema {
  name: string,
  label?: string,
  defaultValue?: unknown,
  setter: INodeSchema<IFieldMeta, ILogicFlowControllerMeta>,
}

export function transPropSchemas(schemas: INodeSchema<IFieldMeta, ILogicFlowControllerMeta>[]): INodeSchema<IFieldMeta, ILogicFlowControllerMeta>[] {
  return schemas.map(propSchema => ({
    componentName: "FormItem",
    props: {
      label: propSchema["x-field"]?.label,
    },
    children: [
      {
        ...propSchema,
        "x-field": {
          name: "props." + propSchema["x-field"]?.name,
          defaultValue: propSchema["x-field"]?.defaultValue,
          label: propSchema["x-field"]?.label,
        },
      }
    ]
  }))
}