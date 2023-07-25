import { INodeSchema } from "@rxdrag/schema";


export interface IPropSchema<Field = unknown, ControllerMeta = unknown> {
  name: string,
  label?: string,
  defaultValue?: unknown,
  setter: INodeSchema<Field, ControllerMeta>,
}

export function transPropSchemas<Field = unknown, ControllerMeta = unknown>(schemas: IPropSchema<Field, ControllerMeta>[]): INodeSchema<Field, ControllerMeta>[] {
  return schemas.map(propSchema => ({
    componentName: "PropLayout",
    props: {
      label: "$title",
    },
    slots: {
      setter: {
        "x-field": {
          name: "props." + propSchema.name,
          defaultValue: propSchema.defaultValue,
        },
        ...propSchema.setter
      },
      expressionSetter: {
        componentName: "ExpressionInput",
        "x-field": {
          name: "propExpressions." + propSchema.name,
        },
      }
    }
  }))
}