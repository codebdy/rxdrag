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
      label: propSchema["x-field"]?.label,
    },
    slots: {
      expressionSetter: {
        componentName: "ExpressionInput",
        "x-field": {
          name: "exprs." + propSchema["x-field"]?.name,
        },
      }
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