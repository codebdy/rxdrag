import { IFieldMeta } from "@rxdrag/fieldy"
import { IControllerMeta } from "@rxdrag/minions-runtime-react"
import { INodeSchema } from "@rxdrag/schema"

export interface ISlotSchema {
  componentName?: string,
  name: string,
  label?: string,
}

export function transSlotSchemas(schemas: ISlotSchema[]): INodeSchema<IFieldMeta, IControllerMeta>[] {
  return schemas.map((schema) => ({
    componentName: "FormItem",
    props: {
      label: schema?.label,
    },
    children: [
      {
        componentName: schema.componentName || "SlotSwitch",
        props: {
          name: schema.name
        },
      }
    ]
  }))
}