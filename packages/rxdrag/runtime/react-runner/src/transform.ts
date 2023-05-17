import { IFieldMeta, INodeSchema } from "@rxdrag/schema";
import { makeRxId } from "@rxdrag/shared";
import { IComponentRenderSchema } from "./ComponentView";
import { IBindParams } from "./interfaces";

export function transToRenderSchema(node:INodeSchema<IFieldMeta<IBindParams> | undefined>) :IComponentRenderSchema{
  const slots: {[name: string]: IComponentRenderSchema | undefined} = {}
  for(const key of Object.keys(node.slots||{})){
    const slot = node.slots?.[key];
    if(slot){
      slots[key] = transToRenderSchema(slot as any)
    }
  }

  return {
    id:makeRxId(),
    ...node,
    children: node?.children?.map(child=>transToRenderSchema(child as any)),
    slots
  }
}