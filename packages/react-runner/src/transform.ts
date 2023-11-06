import { INodeSchema } from "@rxdrag/schema";
import { makeRxId } from "@rxdrag/shared";
import { IComponentRenderSchema } from "./ComponentView";
import { IFieldMeta } from "@rxdrag/fieldy";

export function transToRenderSchema(node: INodeSchema<IFieldMeta | undefined>): IComponentRenderSchema {
  const slots: { [name: string]: IComponentRenderSchema | undefined } = {}
  for (const key of Object.keys(node.slots || {})) {
    const slot = node.slots?.[key];
    if (slot) {
      slots[key] = transToRenderSchema(slot as INodeSchema<IFieldMeta | undefined>)
    }
  }

  return {
    id: makeRxId(),
    ...node,
    children: node?.children?.map(child => transToRenderSchema(child as INodeSchema<IFieldMeta | undefined>)),
    slots
  } as IComponentRenderSchema
}