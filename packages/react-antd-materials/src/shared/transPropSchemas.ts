import { IFieldMeta } from "@rxdrag/fieldy";
import { IControllerMeta } from "@rxdrag/minions-runtime-react";
import { INodeSchema } from "@rxdrag/schema";


export interface IPropSchema {
  name: string,
  label?: string,
  defaultValue?: unknown,
  setter: INodeSchema<IFieldMeta, IControllerMeta>,
}

export function transPropSchemas(schemas: INodeSchema<IFieldMeta, IControllerMeta>[]): INodeSchema<IFieldMeta, IControllerMeta>[] {
  return schemas.map(propSchema => ({
    componentName: "PropLayout",
    props: {
      label: propSchema["x-data"]?.label,
    },
    slots: {
      expressionSetter: {
        componentName: "ExpressionInput",
        "x-data": {
          name: "exprs." + propSchema["x-data"]?.name,
        },
      }
    },
    children: [
      {
        ...propSchema,
        "x-data": {
          name: "props." + propSchema["x-data"]?.name,
          defaultValue: propSchema["x-data"]?.defaultValue,
          label: propSchema["x-data"]?.label,
        },
      }
    ]
  }))
}